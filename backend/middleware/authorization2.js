const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();

const auth2 = async (req, res, next) => {
  try {
      const authHeader = req.header('Authorization');
      if (!authHeader) {
          return res.status(401).send({ error: 'No token provided' });
      }

      const token = authHeader.replace('Bearer ', '');
      console.log('Token recibido:', token);  // Log del token recibido

      const decoded = jwt.verify(token, process.env.SECRET);
      const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

      if (!user) {
          return res.status(401).send({ error: 'Usuario no encontrado' });
      }

      req.token = token;
      req.user = user;
      next();
  } catch (error) {
      res.status(401).send({ error: 'Autenticación fallida' });
  }
};
module.exports = auth2;  // Exporta correctamente la función
