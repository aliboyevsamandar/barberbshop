const TokenUtils = require("../utils/tokenUtil");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const payload = TokenUtils.verifyToken(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.user = payload;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;