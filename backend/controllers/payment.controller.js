const paypal = require('../config/paypal');
const Payment = require('../models/payment');
const Booking = require('../models/booking'); // Asegúrate de tener el modelo Booking disponible

const createPayment = async (req, res) => {
  const { total, bookings } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: total.toString()
      }
    }]
  });

  try {
    const order = await paypal.client.execute(request);
    res.status(201).json(order.result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const capturePayment = async (req, res) => {
    const { orderId } = req.params;
    const { bookings } = req.body;
    const userId = req.user._id;
    
    if (!orderId || !bookings) {
        return res.status(400).json({ message: "Order ID y bookings son requeridos" });
    }

    try {
        // Llama a la API de PayPal para capturar el pago
        const response = await captureOrder(orderID);
        console.log(response); // Log de la respuesta de PayPal
        res.status(200).json(response);
    } catch (error) {
        console.error("Error al capturar el pago:", error.response.data);
        res.status(400).json({ error: "Error al capturar el pago" });
    }
  
    try {
      // Verificar el estado de la orden antes de capturarla
      const orderRequest = new paypal.orders.OrdersGetRequest(orderId);
      const orderResponse = await paypal.client.execute(orderRequest);
  
      const orderStatus = orderResponse.result.status;
  
      if (orderStatus === 'COMPLETED') {
        return res.status(400).json({ error: 'La orden ya fue capturada.' });
      }
  
      if (orderStatus !== 'APPROVED') {
        return res.status(400).json({ error: 'La orden no está lista para ser capturada.' });
      }
  
      // Capturar la orden
      const request = new paypal.orders.OrdersCaptureRequest(orderId);
      request.requestBody({});
  
      const capture = await paypal.client.execute(request);
      const { id, payer, status, purchase_units } = capture.result;
  
      // Guardar el pago en la base de datos
      const payment = new Payment({
        userId,
        orderId: id,
        payerId: payer.payer_id,
        payerEmail: payer.email_address,
        payerName: payer.name?.given_name + ' ' + payer.name?.surname,
        amount: {
          currency: purchase_units[0].amount.currency_code,
          value: purchase_units[0].amount.value,
        },
        bookings,
        status,
      });
  
      await payment.save();
  
      // Actualizar los bookings como pagados
      await Booking.updateMany(
        { _id: { $in: bookings } },
        { $set: { is_paid: true } }
      );
  
      res.status(201).json({ message: 'Pago capturado y guardado', payment });
    } catch (error) {
      console.error("Error al capturar el pago:", error);
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = {
  createPayment,
  capturePayment
};
