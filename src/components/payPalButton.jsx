import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_URL_BACKEND;



const handlePayment = async (order, bookings, token, setTransactionStatus, setIsCaptured,navigate) => {
  
  // Transformar las reservas
  const formattedBookings = bookings.map(booking => ({
    id_guest: booking.id_guest, // Este debería ser un string válido de ObjectId
    id_room_array: booking.id_room_array, // Asegúrate de que sea un array de ObjectIds válidos
    arrival_date: booking.arrival_date,
    departure_date: booking.departure_date,
    guests_qty: booking.guests_qty,
    nights_qty: booking.nights_qty,
    price: booking.price,
    booking_date: booking.booking_date
  }));

  

  try {
    const response = await axios.post(
      `${BACKEND_URL}/pay/capture-payment/${order.id}`,
      { bookings: formattedBookings }, // Envío de bookings formateados
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Respuesta del servidor:', response);

    if (response.status === 200 || response.status === 201) {
      setTransactionStatus('Transacción completada con éxito');
      setIsCaptured(true);
      alert('Transacción completada con éxito');
      // Limpiar localStorage
      localStorage.removeItem('reservationsArray'); // Limpiar el carrito de compras
      const userId = JSON.parse(atob(token.split('.')[1])).user._id;
      const reservations = localStorage.getItem('reservationsArray');
      await fetch(`${BACKEND_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, reservations }),
      });
    

      // Redirigir a /MisReservas
      navigate('/MisReservas');
      
    } else {
      setTransactionStatus('Transacción fallida');
      alert('Transacción fallida: ' + response.data.message);
    }
  } catch (error) {
    setTransactionStatus('Error al capturar el pago');
    console.error('Error details:', error.response || error.message);
    alert('Error al capturar el pago: ' + (error.response?.data?.message || error.message));
  }
};

const PayPalButton = ({ total }) => {
  const bookings = JSON.parse(localStorage.getItem('reservationsArray')) || []; // Asegúrate de parsear el array de reservas
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const [transactionStatus, setTransactionStatus] = useState('');
  const [isCaptured, setIsCaptured] = useState(false); // Nueva bandera para evitar capturas repetidas
  const navigate = useNavigate();

  return (
    <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: total.toString(),
              },
            }],
          });
        }}
        onApprove={async (data, actions) => {
          if (isCaptured) {
            console.log('La orden ya ha sido capturada, evitando captura duplicada.');
            return;
          }

          const order = await actions.order.capture();
          console.log('Capturando la orden:', order); // Esto te dirá si estás capturando una orden que ya fue procesada.

          const token = localStorage.getItem('token');

          // Llamar a la función handlePayment
          await handlePayment(order, bookings, token, setTransactionStatus, setIsCaptured,navigate);
        }}
      />
      {transactionStatus && <p>{transactionStatus}</p>} {/* Muestra el estado de la transacción */}
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
