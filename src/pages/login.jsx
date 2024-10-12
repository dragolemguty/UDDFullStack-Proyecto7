import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_URL_BACKEND;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar mensajes de error
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpiar el mensaje de error antes de enviar

    try {
      const url = `${BACKEND_URL}/auth/signin/`;
      console.log('URL:', url); // Depuración: Mostrar la URL en la consola

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el servidor');
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        sessionStorage.setItem('fromLoginOrBooking', 'true'); // Establecer la bandera
        const userId = JSON.parse(atob(data.token.split('.')[1])).user._id;
        console.log('UserId:', userId);

        const fetchCart = async (userId) => {
          try {
            const cartUrl = `${BACKEND_URL}/cart/${userId}`;
            console.log('Cart URL:', cartUrl); // Depuración: Mostrar la URL del carrito en la consola
        
            const response = await fetch(cartUrl);
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Error al obtener el carrito');
            }
        
            const cart = await response.json();
            console.log('Cart Data:', cart); // Depuración: Mostrar los datos del carrito en la consola
        
            if (cart.cart && cart.cart.reservations) {
              // Parsear la cadena de texto JSON en un objeto JavaScript
              const parsedReservations = JSON.parse(cart.cart.reservations);
        
              // Normalizar los datos si es necesario
              const normalizedReservations = parsedReservations.map(reservation => {
                // Aquí puedes hacer cualquier normalización adicional si es necesario
                return reservation;
              });
        
              localStorage.setItem('reservationsArray', JSON.stringify(normalizedReservations));
              console.log('Reservations saved to localStorage:', normalizedReservations); // Depuración: Mostrar las reservas guardadas en la consola
            } else {
              console.warn('Cart data does not contain reservations:', cart);
            }
          } catch (error) {
            console.error('Error al obtener el carrito:', error);
            setErrorMessage('Error al obtener el carrito. Intente nuevamente más tarde.');
          }
        };
        
        await fetchCart(userId);

        // Verificar si existe un redirect pendiente
        const redirectTo = location.state?.redirectTo || '/';
        const room = location.state?.room;

        if (redirectTo === '/booking' && room) {
          navigate(`/booking`, { state: { room } }); // Redirige al carrito con el room ID
        } else {
          navigate(redirectTo); // Solo redirigir a la página correspondiente
        }
      } else {
        setErrorMessage(data.error || 'Error en el inicio de sesión'); // Mostrar error
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      setErrorMessage('Error en el servidor. Intente nuevamente más tarde.'); // Mensaje de error general
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-2xl font-bold mb-6">Iniciar Sesión</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} {/* Mensaje de error */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
};

export default Login;