const jwt = require("jsonwebtoken");

class TokenUtils {
  static generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3h" });
  }

  static generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  }

  static verifyToken(token, secret) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error("Token verification failed");
    }
  }
}

module.exports = TokenUtils;