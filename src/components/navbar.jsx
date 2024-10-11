// src/components/navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Estado para verificar si el usuario está logueado
  const [username, setUsername] = useState('');  // Estado para guardar el nombre de usuario
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Hacemos un fetch para verificar el token y obtener el perfil del usuario
      const fetchProfile = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/users/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUsername(data.username);  // Actualizamos el estado con el nombre del usuario
            setIsLoggedIn(true);  // Si el usuario está autenticado, actualizamos el estado
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('Error verificando la autenticación:', error);
          setIsLoggedIn(false);
        }
      };
      fetchProfile();
    }
  }, []);

  // Función para manejar el logout
  const handleLogout = () => {
    localStorage.removeItem('token');  // Eliminamos el token del localStorage
    setIsLoggedIn(false);  // Cambiamos el estado para reflejar que el usuario ha salido
    navigate('/login');  // Redirigimos a la página de login
  };

  return (
    <nav className="bg-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Lado izquierdo del navbar */}
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">Hotel</Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Inicio</Link>
              <Link to="/about" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link to="/reserve" className="bg-yellow-400 text-black px-3 py-2 rounded-md text-sm font-medium font-semibold">Reserva Aquí</Link>
            </div>
          </div>
          {/* Lado derecho del navbar */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Mi Perfil ({username})</Link>
                <button onClick={handleLogout} className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/signup" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Signup</Link>
                <Link to="/login" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
