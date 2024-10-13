const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario que realizó el pago
  orderId: { type: String, required: true },
  payerId: { type: String, required: true },  // El ID del pagador proporcionado por PayPal
  payerEmail: { type: String, required: true },
  payerName: { type: String },
  amount: { 
    currency: { type: String, required: true },
    value: { type: String, required: true }
  },
  bookings: [{ // Array de reservas (bookings)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  status: { type: String, required: true },
  paymentDate: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
