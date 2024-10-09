
const moment = require("moment");
const Booking = require('../models/booking');
const Room = require('../models/room');
const { createEvent } = require("./guestEvent.controller");

// Crear reservas (bookings) y guardarlas en la base de datos (solo si es necesario para inicializar)
const createInitialBookings = async (req, res) => {
  try {
    const bookingsData = [
      {
        id_guest: "66ff4b87db91ff9e0265a6f4",
        id_booking: 12345,
        id_room_array: ["66fb61daa1fafb57a4a3bb1b", "66fb61daa1fafb57a4a3bb1d"],
        booking_date: '2024-07-12',
        arrival_date: '2024-07-14',
        departure_date: '2024-07-15',
        nights_qty: 1,
        guests_qty: 4,
        is_modified: false,
        is_paid: true,
        is_cancelled: false,
        last_update_datetime: '2024-07-12 00:00:00'
      },
      {
        id_guest: "66ff4b87db91ff9e0265a6f4",
        id_booking: 2,
        id_room_array: ["66fb61daa1fafb57a4a3bb1d"],
        booking_date: '2024-07-12',
        arrival_date: '2024-08-14',
        departure_date: '2024-08-17',
        nights_qty: 3,
        guests_qty: 2,
        is_modified: false,
        is_paid: true,
        is_cancelled: false,
        last_update_datetime: '2024-07-12 00:00:00'
      },
      {
        id_guest: "66ff4b87db91ff9e0265a6f5",
        id_booking: 3,
        id_room_array: ["66fb61daa1fafb57a4a3bb1a"],
        booking_date: '2024-07-12',
        arrival_date: '2024-08-24',
        departure_date: '2024-08-26',
        nights_qty: 2,
        guests_qty: 2,
        is_modified: false,
        is_paid: false,
        is_cancelled: false,
        last_update_datetime: '2024-07-12 00:00:00'
      },
      {
        id_guest: "66ff4b87db91ff9e0265a6f4",
        id_booking: 4,
        id_room_array: ["66fb61daa1fafb57a4a3bb19"],
        booking_date: '2024-07-12',
        arrival_date: '2024-08-29',
        departure_date: '2024-08-30',
        nights_qty: 1,
        guests_qty: 1,
        is_modified: false,
        is_paid: true,
        is_cancelled: false,
        last_update_datetime: '2024-07-12 00:00:00'
      },
      {
        id_guest: "66ff4b87db91ff9e0265a6f6",
        id_booking: 5,
        id_room_array: ["66fb61daa1fafb57a4a3bb1a"],
        booking_date: '2024-07-12',
        arrival_date: '2024-12-23',
        departure_date: '2024-12-28',
        nights_qty: 4,
        guests_qty: 2,
        is_modified: false,
        is_paid: false,
        is_cancelled: false,
        last_update_datetime: '2024-07-12 00:00:00'
      },
      {
        id_guest: "66ff4b87db91ff9e0265a6f4",
        id_booking: 6,
        id_room_array: ["66fb61daa1fafb57a4a3bb1c", "66fb61daa1fafb57a4a3bb1d"],
        booking_date: '2024-07-12',
        arrival_date: '2024-12-27',
        departure_date: '2024-12-29',
        nights_qty: 2,
        guests_qty: 5,
        is_modified: false,
        is_paid: false,
        is_cancelled: false,
        last_update_datetime: '2024-07-12 00:00:00'
      }
    ];

    // Insertamos las reservas en la base de datos
    const bookings = await Booking.insertMany(bookingsData);
    res.json({ ok: true, description: 'Reservas creadas correctamente', bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando las reservas' });
  }
};

// Obtener todas las reservas
const findAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo las reservas' });
  }
};

// Obtener una reserva por ID
const findBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró la reserva' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo la reserva' });
  }
};

// Actualizar una reserva
const updateBooking = async (req, res) => {
  try {
    const { id_guest, id_room_array, booking_date, arrival_date, departure_date, nights_qty, guests_qty, is_modified, is_paid, is_cancelled, last_update_datetime } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, {
      id_guest,
      id_room_array,
      booking_date,
      arrival_date,
      departure_date,
      nights_qty,
      guests_qty,
      is_modified,
      is_paid,
      is_cancelled,
      last_update_datetime
    }, { new: true });

    if (updatedBooking) {
      res.json(updatedBooking);
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró la reserva para actualizar' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando la reserva' });
  }
};

// Eliminar una reserva
const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    
    if (deletedBooking) {
      res.json({ ok: true, description: 'Reserva eliminada correctamente' });
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró la reserva para eliminar' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando la reserva' });
  }
};

const createBooking = async (req, res) => {
  try {
    const {
      id_guest, 
      id_room_array, 
      arrival_date, 
      departure_date, 
      guests_qty 
    } = req.body;

    const booking_date = moment().format('YYYY-MM-DD');
    const nights_qty = moment(departure_date).diff(moment(arrival_date), 'days');
    const last_update_datetime = moment().format('YYYY-MM-DD hh:mm:ss');

    const newBooking = new Booking({
      id_guest,
      id_room_array,
      booking_date,
      arrival_date,
      departure_date,
      nights_qty,
      guests_qty,
      is_modified: false,
      is_paid: false,
      is_cancelled: false,
      last_update_datetime
    });

    await newBooking.save();
    res.json({ ok: true, description: 'Reserva creada correctamente', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando la reserva' });
  }
};

const findToday = async (req, res) => {
  try {
    const today = moment().format('YYYY-MM-DD');
    const bookings = await Booking.find({ arrival_date: today });
    
    if (bookings.length > 0) {
      res.json({ bookings });
    } else {
      res.status(404).json({ ok: false, description: 'No se encontraron reservas para hoy' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo las reservas de hoy' });
  }
};

const bookDetails = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró la reserva' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo los detalles de la reserva' });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { id } = req.body;
    const booking = await Booking.findByIdAndUpdate(id, { is_modified: true }, { new: true });

    if (booking) {
      await createEvent(req, res); // Suponiendo que createEvent maneja la respuesta
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró la reserva para actualizar' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando la reserva' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { is_cancelled: true }, { new: true });

    if (booking) {
      res.json({ ok: true, description: 'Reserva cancelada correctamente', booking });
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró la reserva a cancelar' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error cancelando la reserva' });
  }
};

const hotelFilter = async (req, res) => {
  try {
    const { hotel } = req.query;
    const today = moment().format('YYYY-MM-DD');
    const futureDate = moment().add(30, 'days').format('YYYY-MM-DD');

    const rooms = await Room.find({ hotel_name: hotel });
    const roomIds = rooms.map(room => room._id);

    const bookings = await Booking.find({
      id_room_array: { $in: roomIds },
      arrival_date: { $gte: today, $lte: futureDate }
    });

    if (bookings.length > 0) {
      res.json({ bookings });
    } else {
      res.status(404).json({ ok: false, description: `No se encontraron reservas para el hotel ${hotel} en los próximos 30 días` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo reservas por hotel' });
  }
};

const datesFilter = async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin } = req.query;

    const bookings = await Booking.find({
      arrival_date: { $gte: fecha_inicio },
      departure_date: { $lte: fecha_fin }
    });

    if (bookings.length > 0) {
      res.json({ bookings });
    } else {
      res.status(404).json({ ok: false, description: 'No se encontraron reservas en ese rango de fechas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error filtrando reservas por fecha' });
  }
};

const roomClassFilter = async (req, res) => {
  try {
    const { tipo_habitacion } = req.query;
    const today = moment().format('YYYY-MM-DD');
    const futureDate = moment().add(30, 'days').format('YYYY-MM-DD');

    const rooms = await Room.find({ room_class: tipo_habitacion });
    const roomIds = rooms.map(room => room._id);

    const bookings = await Booking.find({
      id_room_array: { $in: roomIds },
      arrival_date: { $gte: today, $lte: futureDate }
    });

    if (bookings.length > 0) {
      res.json({ bookings });
    } else {
      res.status(404).json({ ok: false, description: `No se encontraron reservas para la clase de habitación ${tipo_habitacion} en los próximos 30 días` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error filtrando reservas por clase de habitación' });
  }
};

const paidStatus = async (req, res) => {
  try {
    const { estado } = req.query;

    const bookings = await Booking.find({ is_paid: parseInt(estado) });

    if (bookings.length > 0) {
      res.json({ bookings });
    } else {
      res.status(404).json({ ok: false, description: 'No se encontraron reservas con ese estado de pago' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error filtrando reservas por estado de pago' });
  }
};

const qtySearch = async (req, res) => {
  try {
    const { num_huespedes } = req.query;

    const bookings = await Booking.find({ guests_qty: { $gte: parseInt(num_huespedes) } });

    if (bookings.length > 0) {
      res.json({ bookings });
    } else {
      res.status(404).json({ ok: false, description: `No se encontraron reservas con al menos ${num_huespedes} huéspedes` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error buscando reservas por cantidad de huéspedes' });
  }
};

module.exports = {
  createInitialBookings,
  createBooking,
  findToday,
  bookDetails,
  updateRoom,
  deleteBook,
  hotelFilter,
  datesFilter,
  roomClassFilter,
  paidStatus,
  qtySearch,
  findAllBookings, findBookingById, updateBooking, deleteBooking
};



