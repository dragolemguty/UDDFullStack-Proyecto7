const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();
const mongoose = require("mongoose");

const auth = async (req, res, next) => {
  try {
      const authHeader = req.header('Authorization');
      if (!authHeader) {
          return res.status(401).send({ error: 'No token provided' });
      }

      const token = authHeader.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.SECRET);

      const user = await User.findById(decoded.user._id).exec();
      if (!user) {
          return res.status(401).send({ error: 'Usuario no encontrado' });
      }

      req.user = user;  // Asigna el usuario al objeto req
      next();
  } catch (error) {
      console.error('Error en la autenticación:', error);
      return res.status(401).send({ error: 'Autenticación fallida' });
  }
};

module.exports = auth;
