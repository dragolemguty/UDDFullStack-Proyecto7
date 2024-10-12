import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_URL_BACKEND;

const Reserve = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/rooms/`); // URL del backend para obtener rooms
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data)) {
          setRooms(data);
        } else {
          console.error('La respuesta no es un array:', data);
          setRooms([]); // O manejar el estado de error de otra forma
        }
      } catch (error) {
        console.error('Error al obtener las habitaciones:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleBookNow = (room) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/booking', { state: { room } });  // Redirige al carrito con la room seleccionada
    } else {
      navigate('/login', { state: { redirectTo: '/booking', room } });  // Redirige a login, manteniendo la info
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Nuestras habitaciones</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room._id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={`https://via.placeholder.com/300?text=${room.room_class}`} // Placeholder para la imagen
              alt={room.room_class}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-xl font-semibold mb-2">{room.room_class}</h2>
            <p>Hotel: {room.hotel_name}</p>
            <p>Capacidad: {room.capacity} personas</p>
            <p>Orientación: {room.orientation}</p>
            <p>Amenities: {room.amenities}</p>
            <p>Price: {room.price} {room.currency}</p>
            <button
              onClick={() => handleBookNow(room)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reserve;
