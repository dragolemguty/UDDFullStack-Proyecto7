const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  id_guest: { type: mongoose.Schema.Types.ObjectId, ref: "Guest", required: true },
  id_booking: { type: Number, required: false },
  id_room_array: [{type: mongoose.Schema.Types.ObjectId, ref: "Room", require: true }],
  booking_date: { type: Date, required: false },
  arrival_date: { type: Date, required: true },
  departure_date: { type: Date, required: true },
  nights_qty: { type: Number, required: false },
  guests_qty: { type: Number, required: true },
  is_modified: { type: Boolean, default: false },
  is_paid: { type: Boolean, default: false },
  is_cancelled: { type: Boolean, default: false },
  last_update_datetime: { type: Date, required: false }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;