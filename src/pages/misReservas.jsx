import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_URL_BACKEND;

const MisReservas = () => {
  const [reservasActuales, setReservasActuales] = useState([]);
  const [reservasFuturas, setReservasFuturas] = useState([]);
  const [reservasPasadas, setReservasPasadas] = useState([]);
  const [noReservas, setNoReservas] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BACKEND_URL}/booking/user-bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const bookings = response.data;

        if (bookings.length === 0) {
          setNoReservas(true);
        } else {
          const today = new Date();

          const current = bookings.filter(booking => 
            new Date(booking.arrival_date) <= today && new Date(booking.departure_date) >= today
          );
          const future = bookings.filter(booking => 
            new Date(booking.arrival_date) > today
          );
          const past = bookings.filter(booking => 
            new Date(booking.departure_date) < today
          );

          setReservasActuales(current);
          setReservasFuturas(future);
          setReservasPasadas(past);
        }
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      }
    };

    fetchUserBookings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Mis Reservas</h1>

      {noReservas ? (
        <div>
          <p>No tienes ninguna reserva.</p>
          <button
            onClick={() => navigate('/reserve')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Revisa las habitaciones
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-2">Reservas Actuales</h2>
          {reservasActuales.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {reservasActuales.map((reserva, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="font-semibold">{reserva.room_class}</h3>
                  <p>Fecha de llegada: {new Date(reserva.arrival_date).toLocaleDateString()}</p>
                  <p>Fecha de salida: {new Date(reserva.departure_date).toLocaleDateString()}</p>
                  <p>Cantidad de huéspedes: {reserva.guests_qty}</p>
                  <p>Total: {reserva.price * reserva.nights_qty} {reserva.currency}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No tienes reservas actuales.</p>
          )}

          <h2 className="text-2xl font-bold mt-6 mb-2">Reservas Futuras</h2>
          {reservasFuturas.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {reservasFuturas.map((reserva, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="font-semibold">{reserva.room_class}</h3>
                  <p>Fecha de llegada: {new Date(reserva.arrival_date).toLocaleDateString()}</p>
                  <p>Fecha de salida: {new Date(reserva.departure_date).toLocaleDateString()}</p>
                  <p>Cantidad de huéspedes: {reserva.guests_qty}</p>
                  <p>Total: {reserva.price * reserva.nights_qty} {reserva.currency}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No tienes reservas futuras.</p>
          )}

          <h2 className="text-2xl font-bold mt-6 mb-2">Reservas Pasadas</h2>
          {reservasPasadas.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {reservasPasadas.map((reserva, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="font-semibold">{reserva.room_class}</h3>
                  <p>Fecha de llegada: {new Date(reserva.arrival_date).toLocaleDateString()}</p>
                  <p>Fecha de salida: {new Date(reserva.departure_date).toLocaleDateString()}</p>
                  <p>Cantidad de huéspedes: {reserva.guests_qty}</p>
                  <p>Total: {reserva.price * reserva.nights_qty} {reserva.currency}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No tienes reservas pasadas.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MisReservas;
