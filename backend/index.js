const express = require('express');
const cors = require('cors');
const paypal = require('./paypal'); // Importamos el módulo de PayPal
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let cart = [];

// Obtener productos del carrito
app.get('/cart', (req, res) => {
    res.status(200).json(cart);
});

// Agregar productos al carrito
app.post('/cart', (req, res) => {
    const { product } = req.body;
    cart.push(product);
    res.status(201).json(cart);
});

// PayPal
app.post ('/create-payment', async (rec,res)=>{
    const request = new paypal.orders.OrderCreateRequest();
    request.prefer("return=representation");
    request.body = {
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: '100.00'
                }
            }
        ]
    };

try {
    const order = await paypal.client.execute(request);
    res.status(201).json(order.result);
    } catch (error){
        res.status(500).json({error: error.message});
    }
});


app.listen(port, () => {
    console.log(`Server corriendo en el puerto: http://localhost:${port}`);
});
