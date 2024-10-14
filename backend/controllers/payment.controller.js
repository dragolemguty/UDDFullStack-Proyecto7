const paypal = require('../config/paypal');
const Payment = require('../models/payment');
const Booking = require('../models/booking'); // Asegúrate de tener el modelo Booking disponible
const mongoose = require('mongoose');

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


  console.log('booking llegada',bookings)
  if (typeof bookings === 'string') {
    bookings = JSON.parse(bookings);
  }

  bookings.forEach(booking => {
  booking.id_guest = new mongoose.Types.ObjectId(booking.id_guest);
  booking.id_room_array = booking.id_room_array.map(roomId => new mongoose.Types.ObjectId(roomId));
  });

      // Verifica que bookings sea un array
    if (!Array.isArray(bookings)) {
      return res.status(400).json({ message: 'Bookings debe ser un array' });
    }
    const bookingIds = [];

    // Procesar cada reserva
    for (const booking of bookings) {
      // Busca el booking existente por su ID (asegúrate de que `id` sea el campo correcto)
      const existingBooking = await Booking.findOne({
        id_guest: booking.id_guest, // Asegúrate de que el campo `id_guest` sea el correcto
        booking_date: booking.booking_date, // Asegúrate de que el campo `booking_date` sea el correcto
      });

      if (!existingBooking) {
        return res.status(404).json({ message: `Reserva no encontrada para ID: ${booking._id}` });
      }

      // Aquí puedes actualizar cualquier campo necesario en el booking existente
      // Por ejemplo, podrías actualizar el estado del booking después del pago
      existingBooking.is_paid = true; // Suponiendo que tienes un campo de estado
      await existingBooking.save(); // Guarda los cambios
      bookingIds.push(existingBooking._id);
    }




  try {
    // Verificar si ya existe un pago en la base de datos con ese orderId
    const existingPayment = await Payment.findOne({ orderId });
    if (existingPayment) {
      return res.status(400).json({ error: 'La orden ya fue capturada y almacenada.' });
    }

    // Verificar el estado de la orden en PayPal
    const orderRequest = new paypal.orders.OrdersGetRequest(orderId);
    const orderResponse = await paypal.client.execute(orderRequest);
    const orderStatus = orderResponse.result.status;

    // Si la orden ya está completada, simplemente guardar el pago
    if (orderStatus === 'COMPLETED') {
      const { id, payer, purchase_units } = orderResponse.result;

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
       bookings: bookingIds,
        status: orderStatus,
      });

      await payment.save();

      return res.status(201).json({ message: 'Pago ya completado y guardado', payment });
    }

    // Si la orden no está lista para capturarse
    if (orderStatus !== 'APPROVED') {
      return res.status(400).json({ error: 'La orden no está lista para ser capturada.' });
    }

    // Capturar la orden si está aprobada
    const capture = await paypal.client.execute(new paypal.orders.OrdersCaptureRequest(orderId));
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
      bookings: bookingIds,
      status,
    });

    await payment.save();


    res.status(201).json({ message: 'Pago capturado y guardado', payment });
  } catch (error) {
    console.error("Error al capturar el pago:", error);
    if (error.response && error.response.data) {
      return res.status(500).json({ error: error.response.data });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPayment,
  capturePayment
};
