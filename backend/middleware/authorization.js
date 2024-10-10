const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Acceso no autorizado" });
  }
  try {
    let [type, token] = authorization.split(" ");
    console.log("Token:", token); // <-- Log para verificar el token
    if (type === 'Token' || type === 'Bearer') {
      const openToken = jwt.verify(token, process.env.SECRET);
      console.log("Decoded Token:", openToken); // <-- Log del token decodificado
      
      req.user = openToken.user;
      next();
    } else {
      return res.status(401).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    console.error(error);
    res.json({ message: 'ocurrió un error', error });
  }
};