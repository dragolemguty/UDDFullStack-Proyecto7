const mongoose = require('mongoose');

const guestRankSchema = new mongoose.Schema({
  guest_rank: { type: String, required: true },
  descuentos: { type: Number, required: true },
  beneficios: { type: String, default: null }
});

const GuestRank = mongoose.model('GuestRank', guestRankSchema);

module.exports = GuestRank;
