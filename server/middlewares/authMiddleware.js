const jwt = require("jsonwebtoken");

const authMiddleWare = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Access Denied, No Token Provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("decoded: ", decoded);
    req.userId = decoded.id;
    req.role = decoded.role;
    // console.log("req body middleware", req);
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleWare;
