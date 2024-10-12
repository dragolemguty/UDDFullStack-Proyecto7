const express = require('express');
const router = express.Router();
const paypal = require('../config/paypal'); // Asegúrate de que la configuración de PayPal esté en config/paypal.js

// Simulación de un carrito en memoria
let cart = [];

// Obtener productos del carrito
router.get('/', (req, res) => {
    res.status(200).json(cart);
});

// Agregar productos al carrito
router.post('/', (req, res) => {
    const { product } = req.body;
    cart.push(product);
    res.status(201).json(cart);
});

// PayPal - Crear pago
router.post('/create-payment', async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: '100.00' // Puedes ajustar esto según los productos en el carrito
                }
            }
        ]
    });

    try {
        const order = await paypal.client.execute(request);
        res.status(201).json(order.result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
