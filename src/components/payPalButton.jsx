import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import { useState } from 'react';

const BACKEND_URL = import.meta.env.VITE_URL_BACKEND;

const PayPalButton = ({ total, bookings }) => {
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const [transactionStatus, setTransactionStatus] = useState('');

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
          const order = await actions.order.capture();
          try {
            // Obtén el token del almacenamiento local o donde sea que lo estés guardando
            const token = localStorage.getItem('token');

            // Envía la información del pago junto con los bookings al backend, incluyendo el token en los headers
            console.log('Bookings:', bookings);
            const response = await axios.post(
              `${BACKEND_URL}/pay/capture-payment/${order.id}`, 
              { bookings }, 
              {
                headers: {
                  Authorization: `Bearer ${token}`  // Asegúrate de que el token JWT esté incluido aquí
                }
              }
            );
            // Verifica la respuesta del servidor
            if (response.status === 200) {
              setTransactionStatus('Transacción completada con éxito');
              alert('Transacción completada con éxito');
            } else {
              setTransactionStatus('Transacción fallida');
              alert('Transacción fallida: ' + response.data.message);
            }
          } catch (error) {
            setTransactionStatus('Error al capturar el pago');
            // Captura el error y muestra un mensaje
            console.error('Error details:', error.response); // Para ver detalles del error en la consola
            alert('Error al capturar el pago: ' + (error.response?.data?.message || error.message));
          }
        }}
      />
      {transactionStatus && <p>{transactionStatus}</p>} {/* Muestra el estado de la transacción */}
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
