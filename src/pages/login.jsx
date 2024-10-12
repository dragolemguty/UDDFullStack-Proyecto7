import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
      const response = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        sessionStorage.setItem('fromLoginOrBooking', 'true'); // Establecer la bandera

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
