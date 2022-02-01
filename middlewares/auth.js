const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

// validacionToken
let validateToken = (req, res, next) => {
  let token = req.get("token");
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({ err });
    }
    req.usuario = decoded.usuario;
    next();
  });
};

module.exports = validateToken;
