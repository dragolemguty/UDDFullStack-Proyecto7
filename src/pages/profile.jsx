import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, redirecting to login');
        navigate('/login'); // Redirige si no hay token
        return; // Detén la ejecución si no hay token
      }

      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Error al obtener el perfil');
      }
    };

    fetchProfile();
  }, [navigate]); // Añade navigate como dependencia

  return (
    <div>
      <h1>Perfil</h1>
      {userData ? (
        <div>
          <p>Nombre: {userData.name}</p>
          <p>Usuario: {userData.username}</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default Profile;
