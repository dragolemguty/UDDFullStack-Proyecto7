import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BookingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { room } = location.state; // Obtiene la información de la habitación desde el estado

  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [guestsQty, setGuestsQty] = useState(1);
  const [nights, setNights] = useState(0); // Cantidad de noches
  const [totalPrice, setTotalPrice] = useState(room.price || 0);
  const [bookingDate] = useState(new Date()); // Fecha de creación de la reserva

  const calculateTotalPrice = (nights) => {
    setTotalPrice(nights * room.price);
  };

  const handleDateChange = (arrival, departure) => {
    if (arrival && departure) {
      const nightsCount = (new Date(departure) - new Date(arrival)) / (1000 * 60 * 60 * 24);
      setNights(nightsCount);
      calculateTotalPrice(nightsCount);
    }
  };

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    const userId = JSON.parse(atob(token.split('.')[1])).user._id; // Extraer el ID del token JWT

    const bookingData = {
      id_guest: userId,  // Usar el ID extraído del token
      id_room_array: [room._id],
      arrival_date: new Date(arrivalDate),
      departure_date: new Date(departureDate),
      guests_qty: guestsQty,
      nights_qty: nights,
      price: totalPrice,
      booking_date: new Date(bookingDate) // Fecha actual
    };

    try {
      const response = await fetch('http://localhost:3000/api/reservas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        navigate('/cart');
      } else {
        console.error('Error al crear la reserva:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Detalles de la Reserva</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">{room.room_class}</h2>
        <p className="text-gray-700">Precio por noche: {room.price} {room.currency}</p>

        <label className="block mb-2">
          Fecha de llegada:
          <input
            type="date"
            className="border p-2 rounded-lg w-full"
            min={new Date().toISOString().split('T')[0]} // No permite fechas anteriores al día actual
            onChange={(e) => {
              setArrivalDate(e.target.value);
              handleDateChange(e.target.value, departureDate);
            }}
          />
        </label>

        <label className="block mb-2">
          Fecha de salida:
          <input
            type="date"
            className="border p-2 rounded-lg w-full"
            min={arrivalDate ? new Date(new Date(arrivalDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : ''} // Mínimo un día después de la llegada
            onChange={(e) => {
              setDepartureDate(e.target.value);
              handleDateChange(arrivalDate, e.target.value);
            }}
            disabled={!arrivalDate} // Deshabilitado hasta que se seleccione la fecha de llegada
          />
        </label>

        <label className="block mb-4">
          Cantidad de huéspedes:
          <input
            type="number"
            value={guestsQty}
            className="border p-2 rounded-lg w-full"
            onChange={(e) => {
              const qty = Number(e.target.value);
              if (qty <= room.capacity) {
                setGuestsQty(qty);
              }
            }}
            max={room.capacity}
          />
          {guestsQty > room.capacity && (
            <p className="text-red-500">No puede exceder la capacidad de la habitación ({room.capacity} huéspedes).</p>
          )}
        </label>

        <p className="text-lg font-bold">Total: {totalPrice} {room.currency}</p>

        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Reservar
        </button>
      </div>
    </div>
  );
};

export default BookingDetails;
