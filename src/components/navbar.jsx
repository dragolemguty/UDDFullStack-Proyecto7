import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reservationsCount, setReservationsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Establece true si existe token

    if (token) {
      const fetchReservationsCount = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/count`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setReservationsCount(response.data.count);
        } catch (error) {
          console.error('Error fetching reservations count:', error);
        }
      };

      fetchReservationsCount();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div>
        <a href="/" className="text-white font-bold text-xl">Hotelera Shoebilera</a>
        <a href="/about" className="ml-4 text-white">About</a>
        <a href="/reserve" className="ml-4 text-white font-semibold">Reserva aquí</a>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <div className="relative inline-block">
              <a href="/cart" className="ml-4 text-white font-semibold">Carrito</a>
              {reservationsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 text-xs">{reservationsCount}</span>
              )}
            </div>
            <a href="/profile" className="text-white mr-4">Mi Perfil</a>
            <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
          </>
        ) : (
          <>
            <a href="/signup" className="text-white mr-4">Signup</a>
            <a href="/login" className="bg-white text-blue-500 py-2 px-4 rounded">Login</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
