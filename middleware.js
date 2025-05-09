require("dotenv").config();
const jwt = require("jsonwebtoken");
const { schema } = require("./models/booking");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).jsos({ error: "token is missing" });

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decode._id;
    next();
  } catch (err) {
    console.log("Access Denied");
    res
      .status(401)
      .json({ message: "Authentication Error", error: err.message });
  }
};

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

module.exports = { authMiddleware, validate };
