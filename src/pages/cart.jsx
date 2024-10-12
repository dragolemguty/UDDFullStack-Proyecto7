import { useState, useEffect } from 'react';
import axios from 'axios';
import PayPalButton from '../components/PayPalButton';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations(response.data);
    };

    fetchReservations();
  }, []);

  const totalAmount = reservations.reduce((acc, reservation) => acc + (reservation.price * reservation.nights_qty), 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
      <ul className="mb-4">
        {reservations.map((reservation, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded-lg mb-2 shadow">
            {reservation.room_class} - {reservation.price} {reservation.currency} por noche
          </li>
        ))}
      </ul>
      <p>Total: {totalAmount} {reservations.length > 0 ? reservations[0].currency : ''}</p>
      <PayPalButton total={totalAmount} />
    </div>
  );
};

export default Cart;
