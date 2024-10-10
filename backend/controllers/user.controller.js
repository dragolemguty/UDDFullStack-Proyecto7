const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const mongoose = require("mongoose");

const createInitialUser = async (req, res) => {
  try {
    // Hashea la contraseña (asegúrate de ajustar la contraseña según tus necesidades)
    const hashedPassword = await bcryptjs.hash("123", 10);

    const initialUser = new User({
      _id: new mongoose.Types.ObjectId("66fb68ba3d5eb488200c7917"), // Asigna manualmente el _id
      name: "JuanJo",
      username: "dragolem",
      password: hashedPassword,
      active: false
    });

    // Guarda el usuario en la base de datos
    await initialUser.save();
    res.json({ ok: true, description: "Usuario inicial creado correctamente", user: initialUser });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "El usuario inicial ya existe con este _id" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Error creando el usuario inicial" });
    }
  }
};

const findAll = async (req, res) => {
   try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error obteniendo los usuarios' });
  }
}

const findOne = async (req, res) => {
    try {
    const user = await User.findById(req.params.id);
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error obteniendo al usuario' });
  }
}


const getMe = async (req, res) => {
  try {
    const userId = req.user._id;  // Asegúrate de que esto está usando el _id correctamente
    console.log("User ID from token:", userId); // Verifica que se esté obteniendo bien el ID

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error en getMe:", error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
}

const create = async (req, res) => {
  try {
    const { name, username, password, active } = req.body;

    const salt = await bcryptjs.genSalt(11);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const nuevoUsuario = await User.create({ name, username, password: hashedPassword, active });
    res.json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error creando un usuario' });
  }
}

const update = async (req, res) => {
  try {
    const { name, username, password, active } = req.body;

    const salt = await bcryptjs.genSalt(11);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const usuarioActualizado = await User.findByIdAndUpdate(req.params.id, { name, username, password: hashedPassword, active }, { new:true });
    res.json(usuarioActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error actualizando un usuario' });
  }
}

const remove = async (req, res) => {
  try {
    const usuarioBorrado = await User.findByIdAndDelete(req.params.id);
    res.json(usuarioBorrado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error borrando un usuario' });
  }
}

module.exports = {getMe, createInitialUser, create, update, remove, findAll, findOne };