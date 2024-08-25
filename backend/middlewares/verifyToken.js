const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Token is not valid!" });
    }
  } else {
    res.status(401).json({ error: "Token is not provided!" });
  }
};

module.exports = {
  verifyToken,
};