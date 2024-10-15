import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_URL_BACKEND;

const Profile = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/users/me`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUsername(data.username);
            setName(data.name);
            setEmail(data.email);
          } else {
            localStorage.removeItem('token');
            navigate('/login');
          }
        } catch (error) {
          console.error('Error obteniendo el perfil:', error);
          localStorage.removeItem('token');
          navigate('/login');
        }
      };

      fetchProfile();
    }
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Perfil de {username}</h1>
      <br/>
      <p className="text-gray-700">Información sobre el usuario</p>
      <br/>
      <p className="text-gray-700">Nombre: {name}</p>
      <p className="text-gray-700">Email: {email}</p>
    </div>
  );
};

export default Profile;
