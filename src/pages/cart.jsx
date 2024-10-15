import { useState, useEffect } from 'react';
import PayPalButton from '../components/PayPalButton';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchReservations = () => {
      const savedReservations = localStorage.getItem('reservationsArray');

      // Si existen reservas guardadas en localStorage, las cargamos en el estado
      const parsedReservations = savedReservations ? JSON.parse(savedReservations) : [];
      
      // Verificar si existe una nueva reserva (bookingData)
      const savedBookingData = localStorage.getItem('bookingData');
      if (savedBookingData) {
        const parsedBooking = JSON.parse(savedBookingData);

        // Agregar la nueva reserva al array de reservas y guardar en localStorage
        parsedReservations.push(parsedBooking);
        localStorage.setItem('reservationsArray', JSON.stringify(parsedReservations));

        // Limpiar el bookingData del localStorage
        localStorage.removeItem('bookingData');
      }

      // Finalmente, actualizar el estado con las reservas
      setReservations(parsedReservations);
    };

    fetchReservations();
  }, []);

  // Función para eliminar una reserva
  const handleDeleteReservation = (indexToRemove) => {
    const updatedReservations = reservations.filter((_, index) => index !== indexToRemove);

    // Actualizar el estado y el localStorage
    setReservations(updatedReservations);
    localStorage.setItem('reservationsArray', JSON.stringify(updatedReservations));
  };

  // Calcular el monto total
  const totalAmount = reservations.reduce((acc, reservation) => acc + (reservation.price), 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
  
      {/* Mostrar mensaje si el carrito está vacío */}
      {reservations.length === 0 ? (
        <div>
          <p>Tu carrito está vacío.</p>
          <button
            onClick={() => navigate('/reserve')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Agrega una reserva
          </button>
        </div>
      ) : (
        <div>
          <ul className="mb-4">
            {reservations.map((reservation, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded-lg mb-2 shadow">
                <h2 className="font-semibold">{reservation.room_class}</h2>
                <p>{reservation.nights_qty} noches</p>
                <p>{reservation.price} {reservation.currency} por noche</p>
                <p>Total: {reservation.price * reservation.nights_qty} {reservation.currency}</p>
  
                {/* Botón para eliminar la reserva */}
                <button
                  onClick={() => handleDeleteReservation(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
  
          {/* Mostrar el total general de todas las reservas */}
          <p className="text-lg font-bold">Total a pagar: {totalAmount} {reservations[0]?.currency}</p>
  
          {/* Botones de acciones centrados */}
          <div className="flex flex-col items-center mt-4">
            <div className="w-full max-w-md"> {/* Limitar el ancho del botón de PayPal */}
              <PayPalButton total={totalAmount} />
            </div>
            <button
              onClick={() => navigate('/reserve')}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 w-full max-w-md" // Ajusta el tamaño del botón de reserva
            >
              Agrega otra reserva
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
