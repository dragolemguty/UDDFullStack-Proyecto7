const Guest = require('../models/guest'); // Importamos el modelo de Guest
const User = require('../models/user');
const mongoose = require("mongoose");

// Crear invitados (guests) y guardarlos en la base de datos (solo si es necesario para inicializar)
const createInitialGuests = async (req, res) => {
  try {
    const guestsData = [
      { _id: new mongoose.Types.ObjectId("66ff4b87db91ff9e0265a6f4"),
        id_guest: 1,
        guest_name: 'JuanJo',
        guest_lastname: 'Gutierrez',
        gender: 'M',
        birth_date: '1995-10-27',
        contact_number: null,
        DNI_number: null,
        guest_adress: null,
        register_date: '2024-07-12',
        guest_rank: 'Standard',
        guest_details: null,
        user: "66fb68ba3d5eb488200c7917"
      },
      { _id: new mongoose.Types.ObjectId("66ff4b87db91ff9e0265a6f5"),
        id_guest: 2,
        guest_name: 'Daniela',
        guest_lastname: 'Lopez',
        gender: 'F',
        birth_date: '1991-10-24',
        contact_number: null,
        DNI_number: null,
        guest_adress: null,
        register_date: '2024-07-12',
        guest_rank: 'VIP',
        guest_details: null,
        user: "66fb68ba3d5eb488200c7917"
      },
      { _id: new mongoose.Types.ObjectId("66ff4b87db91ff9e0265a6f6"),
        id_guest: 3,
        guest_name: 'Constanza',
        guest_lastname: 'Ferreyra',
        gender: 'NB',
        birth_date: '2003-04-21',
        contact_number: null,
        DNI_number: null,
        guest_adress: null,
        register_date: '2024-07-12',
        guest_rank: 'Aspiracional',
        guest_details: null,
        user: "66fb68ba3d5eb488200c7917"
      }
    ];

    // Insertamos los invitados en la base de datos
    const guests = await Guest.insertMany(guestsData);
    res.json({ ok: true, description: 'Invitados creados correctamente', guests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando los invitados' });
  }
};

const createGuest = async (req, res) => {
  try {
    // Obtiene el user_id desde el token decodificado (middleware de autenticación)
    const userId = req.user.id;

    // Datos necesarios para crear el nuevo Guest
    const { id_guest, guest_name, guest_lastname, gender, birth_date, contact_number, DNI_number, guest_adress, register_date, guest_rank, guest_details } = req.body;

    // Crear el nuevo guest y asociarlo al usuario autenticado
    const nuevoGuest = await Guest.create({
      id_guest,
      guest_name,
      guest_lastname,
      gender,
      birth_date,
      contact_number,
      DNI_number,
      guest_adress,
      register_date,
      guest_rank,
      guest_details,
      user: userId
    });

    res.status(201).json({
      message: "Guest creado exitosamente",
      guest: nuevoGuest
    });
  } catch (error) {
    console.error("Error creando guest:", error);
    res.status(500).json({ message: "Error creando el guest" });
  }
};

// Obtener todos los invitados
const findAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find({});
    res.json({ guests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo los invitados' });
  }
};

// Obtener un invitado por ID
const findGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (guest) {
      res.json(guest);
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró el invitado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo el invitado' });
  }
};

// Actualizar un invitado
const updateGuest = async (req, res) => {
  try {
    const { guest_name, guest_lastname, gender, birth_date, contact_number, DNI_number, guest_adress, register_date, guest_rank, guest_details } = req.body;

    const updatedGuest = await Guest.findByIdAndUpdate(req.params.id, {
      guest_name,
      guest_lastname,
      gender,
      birth_date,
      contact_number,
      DNI_number,
      guest_adress,
      register_date,
      guest_rank,
      guest_details
    }, { new: true });

    if (updatedGuest) {
      res.json(updatedGuest);
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró el invitado para actualizar' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando el invitado' });
  }
};

// Eliminar un invitado
const deleteGuest = async (req, res) => {
  try {
    const deletedGuest = await Guest.findByIdAndDelete(req.params.id);
    
    if (deletedGuest) {
      res.json({ ok: true, description: 'Invitado eliminado correctamente' });
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró el invitado para eliminar' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando el invitado' });
  }
};

module.exports = { createGuest, createInitialGuests, findAllGuests, findGuestById, updateGuest, deleteGuest };
