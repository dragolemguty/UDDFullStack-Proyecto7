const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  id_guest: { type: Number, required: true },
  guest_name: { type: String, required: true },
  guest_lastname: { type: String, required: true },
  gender: { type: String, required: true },
  birth_date: { type: Date, required: true },
  contact_number: { type: String, default: null },
  DNI_number: { type: String, default: null },
  guest_adress: { type: String, default: null },
  register_date: { type: Date, required: true },
  guest_rank: { type: String, required: true },
  guest_details: { type: String, default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
