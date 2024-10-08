import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

interface User {
  firstName: string;
  lastName: string;
}

interface Hotel {
  id: number;
  hotelName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  stars: number;
  amenities: {
    wifi: boolean;
    pool: boolean;
    parking: boolean;
    shuttle: boolean;
    petFriendly: boolean;
  };
  images: string[];
  rooms: { roomType: string; price: number; beds: number; capacity: number }[];
  comments: { username: string; text: string }[];
}

const HotelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [isLoggedIn] = useState(true); // Simula que el usuario está logueado
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<User | null>(null); // Añadir estado para el usuario logueado

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/hotels/${id}`);
        const hotelData = {
          ...response.data.hotel,
          comments: response.data.hotel.comments || [],
          amenities: response.data.hotel.amenities || {},
          rooms: response.data.hotel.rooms || []
        };

        setHotel(hotelData);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        setHotel(null); // Limpia el estado si hay un error
      }
    };

    const fetchUserDetails = async () => {
      // Aquí deberías implementar la lógica para obtener los detalles del usuario logueado
      // Esto es solo un ejemplo; reemplaza con tu lógica
      const loggedInUser = { firstName: 'Nombre', lastName: 'Apellido' };
      setUser(loggedInUser);
    };

    fetchHotelDetails();
    fetchUserDetails(); // Llamar a la función para obtener el usuario
  }, [id]);

  const handleReserve = () => {
    navigate(`/reservation`);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;

    try {
      await axios.post('http://localhost:3001/api/comments', {
        hotelId: hotel?.id,
        username: `${user?.firstName} ${user?.lastName}`, // Usar el nombre y apellido del usuario
        text: newComment,
      });

      // Actualiza el estado con el nuevo comentario
      setHotel((prevHotel) => prevHotel ? {
        ...prevHotel,
        comments: [...prevHotel.comments, { username: `${user?.firstName} ${user?.lastName}`, text: newComment }]
      } : prevHotel);
      setNewComment('');
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }
  };

  if (!hotel) {
    return <div>Hotel no encontrado</div>;
  }

  return (
    <div className="bg-[#111518] min-h-screen text-white">
      <Navbar />
      <div className="max-w-screen-xl mx-auto p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start mb-8">
          <img src={hotel.images[0]} alt={hotel.hotelName} className="w-full lg:w-1/2 h-auto object-cover rounded-lg shadow-lg" />
          <div className="lg:ml-8 mt-6 lg:mt-0 lg:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{hotel.hotelName}</h1>

            {/* Características del hotel */}
            <section className="p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Características del hotel</h2>
              <table className="w-full text-left text-gray-400">
                <tbody>
                  <tr>
                    <td className="py-2">Dirección</td>
                    <td className="py-2">{hotel.address}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Ciudad</td>
                    <td className="py-2">{hotel.city}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Estado</td>
                    <td className="py-2">{hotel.state}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Código Postal</td>
                    <td className="py-2">{hotel.zipCode}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Wi-Fi</td>
                    <td className="py-2">{hotel.amenities.wifi ? 'Sí' : 'No'}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Piscina</td>
                    <td className="py-2">{hotel.amenities.pool ? 'Sí' : 'No'}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Estacionamiento</td>
                    <td className="py-2">{hotel.amenities.parking ? 'Sí' : 'No'}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Transporte al aeropuerto</td>
                    <td className="py-2">{hotel.amenities.shuttle ? 'Sí' : 'No'}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Admite mascotas</td>
                    <td className="py-2">{hotel.amenities.petFriendly ? 'Sí' : 'No'}</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>

        <section className="bg-gray-800 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Precios y disponibilidad</h2>
          <table className="w-full text-left text-gray-400">
            <thead>
              <tr>
                <th className="py-2">Tipo de habitación</th>
                <th className="py-2">Precio por noche</th>
                <th className="py-2">Número de camas</th>
                <th className="py-2">Capacidad</th>
                <th className="py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {hotel.rooms.map((room, index) => (
                <tr key={index}>
                  <td className="py-2">{room.roomType}</td>
                  <td className="py-2">{room.price}</td>
                  <td className="py-2">{room.beds}</td>
                  <td className="py-2">{room.capacity}</td>
                  <td className="py-2 text-right">
                    <button onClick={handleReserve} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                      Reservar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
          {hotel.comments.length > 0 ? (
            hotel.comments.map((comment, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
                <p className="text-gray-300">{comment.username}: {comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No hay comentarios aún.</p>
          )}

          {isLoggedIn ? (
            <div>
              <textarea
                className="w-full bg-gray-800 text-white rounded-lg p-4"
                placeholder="Deja tu comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button onClick={handleCommentSubmit} className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                Enviar comentario
              </button>
            </div>
          ) : (
            <p className="text-gray-400">Inicia sesión para dejar un comentario.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default HotelDetails;
