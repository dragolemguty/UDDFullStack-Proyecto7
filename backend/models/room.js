const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  id_room: { type: Number, required: true },
  hotel_name: { type: String, required: true },
  floor_number: { type: Number, required: true },
  room_number: { type: Number, required: true },
  capacity: { type: Number, required: true },
  orientation: { type: String, required: true },
  room_class: { type: String, required: true },
  amenities: { type: String, required: true }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
