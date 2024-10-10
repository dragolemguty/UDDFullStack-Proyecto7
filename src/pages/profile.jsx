import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const fetchProfile = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/users/me', {  // Aquí usamos /me
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUsername(data.user.username);  // Asigna el nombre de usuario a la variable de estado
          } else {
            localStorage.removeItem('token');
            navigate('/login'); // Si el token no es válido, redirige a login
          }
        } catch (error) {
          console.error('Error obteniendo el perfil:', error);
          localStorage.removeItem('token');
          navigate('/login'); // Si hay error, redirige a login
        }
      };

      fetchProfile();
    }
  }, [navigate]);

  return (
    <div>
      <h1>Perfil de {username}</h1>
      <p>Información dummy sobre el hotel.</p>
    </div>
  );
};

export default Profile;
