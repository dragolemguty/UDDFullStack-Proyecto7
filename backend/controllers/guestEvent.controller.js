const GuestEvent = require('../models/guestEvent'); // Importamos el modelo
const moment = require('moment');

// Crear un nuevo evento para una reserva (booking)
const createEvent = async (req, res) => {
  try {
    // Obtener el id_booking del cuerpo de la solicitud
    const id_booking = req.body.id_booking;
    
    // Obtener el evento más reciente para asignar un nuevo ID
    const lastEvent = await GuestEvent.findOne().sort({ id_event: -1 });
    const id_event = lastEvent ? lastEvent.id_event + 1 : 1; // Asignar un ID secuencial
    
    const event_datetime = moment().format('YYYY-MM-DD hh:mm:ss');
    const {
      is_type_room_change,
      is_qty_guest_change,
      is_qty_room_change,
      is_dates_change,
      new_type_room,
      deleted_rooms,
      adds_rooms,
      new_arrival_date,
      new_departure_date,
      new_guests_qty,
      new_nights_qty
    } = req.body;

    // Crear el evento en la base de datos
    const newEvent = new GuestEvent({
      id_booking,
      id_event,
      event_datetime,
      is_type_room_change,
      is_qty_guest_change,
      is_qty_room_change,
      is_dates_change,
      new_type_room,
      deleted_rooms,
      adds_rooms,
      new_arrival_date,
      new_departure_date,
      new_guests_qty,
      new_nights_qty
    });

    await newEvent.save(); // Guardamos el evento en la base de datos

    res.send({ ok: true, description: 'Evento generado correctamente', event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando el evento' });
  }
};

// Obtener todos los eventos de una reserva específica
const getEventsByBooking = async (req, res) => {
  try {
    const id_booking = req.params.id_booking;
    const events = await GuestEvent.find({ id_booking });

    if (events.length > 0) {
      res.json({ ok: true, events });
    } else {
      res.status(404).json({ ok: false, description: 'No se encontraron eventos para esta reserva' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo los eventos' });
  }
};

// Obtener un evento específico por su ID
const getEventById = async (req, res) => {
  try {
    const event = await GuestEvent.findById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró el evento' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo el evento' });
  }
};

module.exports = { createEvent, getEventsByBooking, getEventById };
