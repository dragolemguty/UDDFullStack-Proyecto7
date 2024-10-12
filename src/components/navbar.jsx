import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_URL_BACKEND;
import { RefreshContext } from '../context/RefreshContext';  // Importar el contexto

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reservationsCount, setReservationsCount] = useState(0);
  const [reservationsArray, setReservationsArray] = useState([]);
  const navigate = useNavigate();
  const { shouldRefresh } = useContext(RefreshContext);  // Obtener shouldRefresh del contexto

  useEffect(() => {
    if (shouldRefresh) {
      console.log("Refrescando desde Navbar...");
      sessionStorage.removeItem('alreadyRefreshed'); // Asegurarse de limpiar la bandera antes del refresh
      window.location.reload(); // Si quieres refrescar desde el navbar
    }
  }, [shouldRefresh]);

  useEffect(() => {

    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Establece true si existe token

    if (token) {
      const savedReservations = localStorage.getItem('reservationsArray');
      if (savedReservations) {
        setReservationsArray(JSON.parse(savedReservations));
      } else {
        // Si no hay carrito en localStorage, podrías considerar cargarlo desde el backend
        const userId = JSON.parse(atob(token.split('.')[1])).user._id;
        fetch(`${BACKEND_URL}/cart/${userId}`)
          .then(response => response.json())
          .then(data => {
            if (data.cart && data.cart.reservations) {
              const parsedReservations = JSON.parse(data.cart.reservations);
              const normalizedReservations = parsedReservations.map(reservation => {
                return reservation;
              });        
              localStorage.setItem('reservationsArray', JSON.stringify(normalizedReservations));
              setReservationsArray(data.cart.reservations);
            }
          })
        }
      }


    const savedBookings = localStorage.getItem('bookingData');
    if (savedBookings) {
      const bookingsArray = JSON.parse(savedBookings);
      setReservationsCount(bookingsArray.length); // Establece el número de reservas
    }
  }, []);


  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    const userId = JSON.parse(atob(token.split('.')[1])).user._id;
    const reservations = localStorage.getItem('reservationsArray');
  
    // Llamar al endpoint para actualizar el carrito
    await fetch(`${BACKEND_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, reservations }),
    });
  
    localStorage.removeItem('token');
    localStorage.removeItem('reservationsArray');
    localStorage.removeItem('bookingData');
    sessionStorage.removeItem('alreadyRefreshed'); 
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
            <a href="/login" className="text-white">Login</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
