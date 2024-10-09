const Room = require('../models/room'); // Importamos el modelo de Room
const mongoose = require("mongoose");

// Crear habitaciones y guardarlas en la base de datos (solo si es necesario para inicializar la base de datos)
const createInitialRooms = async (req, res) => {
  try {
    // Datos de ejemplo que antes estaban en arrays
    const roomsData = [
      { _id: new mongoose.Types.ObjectId("66fb61daa1fafb57a4a3bb19"),
        id_room: 1,
        hotel_name: 'Hotel Paraíso',
        floor_number: 1,
        room_number: 101,
        capacity: 2,
        orientation: 'P',
        room_class: 'Simple',
        amenities: '1 cama'
      },
      { _id: new mongoose.Types.ObjectId("66fb61daa1fafb57a4a3bb1a"),
        id_room: 2,
        hotel_name: 'Hotel Paraíso',
        floor_number: 2,
        room_number: 201,
        capacity: 3,
        orientation: 'O',
        room_class: 'Doble',
        amenities: '2 camas, AC'
      },
      { _id: new mongoose.Types.ObjectId("66fb61daa1fafb57a4a3bb1b"),
        id_room: 3,
        hotel_name: 'Hotel Paraíso',
        floor_number: 3,
        room_number: 301,
        capacity: 4,
        orientation: 'S',
        room_class: 'Suit Familiar',
        amenities: '3 camas'
      },
      { _id: new mongoose.Types.ObjectId("66fb61daa1fafb57a4a3bb1c"),
        id_room: 4,
        hotel_name: 'Hotel Shoebill',
        floor_number: 2,
        room_number: 201,
        capacity: 3,
        orientation: 'N',
        room_class: 'Suit Deluxe',
        amenities: '3 camas'
      },
      { _id: new mongoose.Types.ObjectId("66fb61daa1fafb57a4a3bb1d"),
        id_room: 5,
        hotel_name: 'Hotel Shoebill',
        floor_number: 3,
        room_number: 301,
        capacity: 5,
        orientation: 'NO',
        room_class: 'Suit Presidencial',
        amenities: '4 camas'
      }
    ];

    // Insertamos las habitaciones en la base de datos
    const rooms = await Room.insertMany(roomsData);
    res.json({ ok: true, description: 'Habitaciones creadas correctamente', rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando las habitaciones' });
  }
};

// Obtener todas las habitaciones
const findAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.json({ rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo las habitaciones' });
  }
};

// Obtener una habitación por ID
const findRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró la habitación' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo la habitación' });
  }
};

// Actualizar una habitación
const updateRoom = async (req, res) => {
  try {
    const { hotel_name, floor_number, room_number, capacity, orientation, room_class, amenities } = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {
      hotel_name,
      floor_number,
      room_number,
      capacity,
      orientation,
      room_class,
      amenities
    }, { new: true });

    if (updatedRoom) {
      res.json(updatedRoom);
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró la habitación para actualizar' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando la habitación' });
  }
};

// Eliminar una habitación
const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    
    if (deletedRoom) {
      res.json({ ok: true, description: 'Habitación eliminada correctamente' });
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró la habitación para eliminar' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando la habitación' });
  }
};

module.exports = { createInitialRooms, findAllRooms, findRoomById, updateRoom, deleteRoom };
