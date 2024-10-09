const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { name, username, password, active } = req.body;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const nuevoUsuario = await User.create({
      name,
      username,
      password: hashedPassword,
      active
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error dando de alta al usuario' });
    
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const theUser = await User.findOne({ username });
    if (!theUser) {
      return res.status(400).json({ message: 'el nombre de usuario no existe' });
    }
    const passwordCorrect = await bcryptjs.compare(password, theUser.password);

    if (!passwordCorrect) {
      return res.status(400).json({ message: 'el nombre de usuario o contraseña no es correcto' });
    }

    const payload = { user: { id: theUser.id } };
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3_600_000
      },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error en el token', error });
  }
};

module.exports = { signup, signin };