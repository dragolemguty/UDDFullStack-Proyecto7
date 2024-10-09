const mongoose = require('mongoose');

const guestEventSchema = new mongoose.Schema({
  id_booking: { type: Number, required: true },
  id_event: { type: Number, required: true, unique: true },
  event_datetime: { type: String, required: true },
  is_type_room_change: { type: Boolean, default: false },
  is_qty_guest_change: { type: Boolean, default: false },
  is_qty_room_change: { type: Boolean, default: false },
  is_dates_change: { type: Boolean, default: false },
  new_type_room: { type: String, default: null },
  deleted_rooms: { type: [Number], default: [] },
  adds_rooms: { type: [Number], default: [] },
  new_arrival_date: { type: String, default: null },
  new_departure_date: { type: String, default: null },
  new_guests_qty: { type: Number, default: null },
  new_nights_qty: { type: Number, default: null }
});

const GuestEvent = mongoose.model('GuestEvent', guestEventSchema);

module.exports = GuestEvent;
