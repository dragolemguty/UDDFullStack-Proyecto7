const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { name, email, username, password, active } = req.body;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const nuevoUsuario = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      active,
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error dando de alta al usuario' });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const theUser = await User.findOne({ email });
    if (!theUser) {
      return res.status(400).json({ message: 'El nombre de usuario no existe' });
    }

    const passwordCorrect = await bcryptjs.compare(password, theUser.password);
    if (!passwordCorrect) {
      return res.status(400).json({ message: 'El nombre de usuario o contraseña no es correcto' });
    }

    // Crear el payload para el token
    const payload = { user: { _id: theUser._id } };

    // Generar el token JWT
    jwt.sign(
      payload,
      process.env.SECRET,  // Asegúrate de que este valor esté en tu archivo .env
      { expiresIn: '1h' },  // Duración del token
      (error, token) => {
        if (error) {
          console.error('Error generando el token:', error);
          return res.status(500).json({ message: 'Error generando el token' });
        }

        res.status(200).json({ token }); // Enviar el token al frontend
      }
    );
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { signup, signin };
