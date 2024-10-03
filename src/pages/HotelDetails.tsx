import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface Hotel {
  image: string;
  name: string;
  location: string;
  rating: string;
  reviews: string;
  description: string;
  price: string;
  features: { key: string, value: string }[];
}

const HotelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();  // Usar useNavigate para redirigir
  const [isLoggedIn] = useState(true); // Simulación de login para comentarios

  const hotelData: { [key: string]: Hotel } = {
    "1": {
      image: '/src/assets/hotel1.jpg',
      name: 'The Ritz-Carlton Key Biscayne',
      location: 'Miami, Florida',
      rating: '4.7',
      reviews: '44',
      description: 'Alojamiento entero • 1 habitación • Vistas al mar • Wi-Fi gratis • Desayuno incluido',
      price: '$250 por noche',
      features: [
        { key: 'Tipo de habitación', value: 'Deluxe Room' },
        { key: 'Cama', value: '1 King Bed' },
        { key: 'Tamaño', value: '300 ft²' },
        { key: 'Vista', value: 'Vista al mar' },
        { key: 'Desayuno', value: 'Incluido' },
        { key: 'Wi-Fi', value: 'Incluido' }
      ]
    },
    "2": {
      image: '/src/assets/hotel2.jpg',
      name: 'Hotel Nikko',
      location: 'San Francisco, California',
      rating: '4.5',
      reviews: '100',
      description: 'Alojamiento entero • 2 habitaciones • Vista a la ciudad • Wi-Fi gratis',
      price: '$180 por noche',
      features: [
        { key: 'Tipo de habitación', value: 'Suite Room' },
        { key: 'Cama', value: '2 Queen Beds' },
        { key: 'Tamaño', value: '400 ft²' },
        { key: 'Vista', value: 'Vista a la ciudad' },
        { key: 'Desayuno', value: 'No incluido' },
        { key: 'Wi-Fi', value: 'Incluido' }
      ]
    }
  };

  const hotel = hotelData[id as string];

  if (!hotel) {
    return <div>Hotel no encontrado</div>;
  }

  // Al presionar el botón de reservar, redirigimos a la página de reserva
  const handleReserve = () => {
    navigate(`/reservation`);
  };

  return (
    <div className="bg-[#111518] min-h-screen text-white">
      <Navbar />
      <div className="max-w-screen-xl mx-auto p-6 lg:p-8">
        {/* Sección principal con la imagen, el nombre y la tabla de calificación */}
        <div className="flex flex-col lg:flex-row lg:items-start mb-8">
          <img src={hotel.image} alt={hotel.name} className="w-full lg:w-1/2 h-auto object-cover rounded-lg shadow-lg" />
          <div className="lg:ml-8 mt-6 lg:mt-0 lg:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
            <p className="text-lg text-gray-400 mb-4">{hotel.location}</p>

            {/* Calificación numérica, estrellas y reseñas */}
            <div className="flex items-center mb-4">
              <h2 className="text-4xl font-bold">{hotel.rating}</h2>
              <div className="ml-4 flex">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${index < Math.round(parseFloat(hotel.rating)) ? 'text-yellow-400' : 'text-gray-400'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.946 5.982h6.262c.969 0 1.371 1.24.588 1.81l-5.07 3.657 1.945 5.981c.3.922-.755 1.688-1.54 1.11l-5.07-3.656-5.072 3.656c-.783.577-1.838-.188-1.54-1.11l1.946-5.98-5.07-3.658c-.784-.57-.38-1.81.588-1.81h6.262l1.946-5.982z" />
                  </svg>
                ))}
              </div>
              <p className="ml-4 text-gray-400">{hotel.reviews} reviews</p>
            </div>

            {/* Gráfico de calificaciones refinado */}
            <div className="mt-4 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <p className="w-4">{rating}</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${rating * 10}%` }}></div>
                  </div>
                  <p className="w-12 text-right">{`${rating * 10}%`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Características del hotel */}
        <section className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Características del hotel</h2>
          <table className="w-full text-left text-gray-400">
            <tbody>
              {hotel.features.map((feature, index) => (
                <tr key={index}>
                  <td className="py-2">{feature.key}</td>
                  <td className="py-2">{feature.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Tabla de precios */}
        <section className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Precios y disponibilidad</h2>
          <table className="w-full text-left text-gray-400">
            <thead>
              <tr>
                <th className="py-2">Opciones</th>
                <th className="py-2">Precio por noche</th>
                <th className="py-2">Habitaciones disponibles</th>
                <th className="py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">Reservar habitación</td>
                <td className="py-2">{hotel.price}</td>
                <td className="py-2">2 habitaciones restantes</td>
                <td className="py-2 text-right">
                  <button onClick={handleReserve} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                    Reservar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Comentarios */}
        <section className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-300">Juan Pérez: Excelente servicio y ubicación.</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-300">María García: Las instalaciones eran impecables.</p>
          </div>

          {isLoggedIn ? (
            <div>
              <textarea
                className="w-full bg-gray-800 text-white rounded-lg p-4"
                placeholder="Deja tu comentario..."
              ></textarea>
              <button className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
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
