const express = require('express');
const router = express.Router();
const { createPayment, capturePayment } = require('../controllers/payment.controller');
const auth = require('../middleware/authorization3'); // Asegúrate de tener un middleware de autenticación

// Crear un nuevo pago
router.post('/create-payment', auth, createPayment);

// Capturar un pago después de la aprobación de PayPal
router.post('/capture-payment/:orderId', auth, capturePayment);

module.exports = router;
