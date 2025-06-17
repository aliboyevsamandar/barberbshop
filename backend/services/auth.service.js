const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const MailService = require("./mail.service");
const {
  registerStep1Schema,
  registerStep2Schema,
  loginSchema,
} = require("../validations/auth.validation");
const TokenUtils = require("../utils/tokenUtil");

class AuthService {
  async registerStep1(name, email, password) {
    const { error } = registerStep1Schema.validate({ name, email, password });
    if (error) throw new Error(error.details[0].message);

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    await MailService.sendOtp(email);

    return {
      name,
      email,
      password: hashedPassword,
      message: "Barber Shop code sent to your email",
    };
  }

  async registerStep2(name, email, password, code) {
    const { error } = registerStep2Schema.validate({
      name,
      email,
      password,
      code,
    });
    if (error) throw new Error(error.details[0].message);

    const isOtpValid = MailService.verifyOtp(email, code);
    if (!isOtpValid) throw new Error("Invalid or expired Barber Shop");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const accessToken = TokenUtils.generateAccessToken({ id: newUser._id });
    const refreshToken = TokenUtils.generateRefreshToken({ id: newUser._id });

    return {
      message: "User successfully registered",
      accessToken,
      refreshToken,
    };
  }

  async login(email, password) {
    const { error } = loginSchema.validate({ email, password });
    if (error) throw new Error(error.details[0].message);

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const accessToken = TokenUtils.generateAccessToken({ id: user._id });
    const refreshToken = TokenUtils.generateRefreshToken({ id: user._id });

    return {
      message: "User successfully logged in",
      accessToken,
      refreshToken,
    };
  }

  async resetPasswordStep1(email) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    await MailService.sendOtp(email);

    return { message: "Barber Shop code sent to your email" };
  }

  async resetPasswordStep2(email, code, newPassword) {
    const isOtpValid = MailService.verifyOtp(email, code);
    if (!isOtpValid) throw new Error("Invalid or expired OTP");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });

    return { message: "Password successfully reset" };
  }

  async getAllUsers() {
    const users = await User.find().select("-password");
    return users;
  }

  async updateUser(id, updates) {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
      console.log("Hashed password:", updates.password);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!updatedUser) throw new Error("User not found");

    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw new Error("User not found");

    return { message: "User successfully deleted" };
  }
}

module.exports = new AuthService();
