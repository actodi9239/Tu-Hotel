import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CardExplore from '../components/CardExplore';
import axios from 'axios';

const ExploreHotels: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: '',
    rooms: '',
    guests: '',
  });
  const [hotels, setHotels] = useState([]); // Estado para almacenar hoteles
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/hotels'); // Obtener hoteles desde la API
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []); // Llama a la API al montar el componente

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    console.log('Realizando búsqueda con:', searchParams);
    // Aquí puedes implementar la lógica de búsqueda según los parámetros
  };

  if (loading) {
    return <div>Loading...</div>; // Muestra un mensaje de carga
  }

  return (
    <div className="bg-[#111518] min-h-screen text-white">
      <Navbar />

      {/* Barra de búsqueda */}
      <header className="py-10 max-w-screen-xl mx-auto px-4 lg:px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Busca tu alojamiento ideal</h1>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Filtros de búsqueda */}
          <input
            type="text"
            name="location"
            value={searchParams.location}
            onChange={handleInputChange}
            placeholder="¿Dónde?"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="date"
            name="date"
            value={searchParams.date}
            onChange={handleInputChange}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="number"
            name="rooms"
            value={searchParams.rooms}
            onChange={handleInputChange}
            placeholder="Habitaciones"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="number"
            name="guests"
            value={searchParams.guests}
            onChange={handleInputChange}
            placeholder="Huéspedes"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg md:ml-4"
          >
            Buscar
          </button>
        </div>
      </header>

      {/* Resultados de búsqueda */}
      <section className="py-10 max-w-screen-xl mx-auto px-4 lg:px-6">
        <h2 className="text-3xl font-bold mb-8">Descubre alojamientos</h2>
        <div className="space-y-6">
          {hotels.map((hotel: any) => (
            <CardExplore
              key={hotel.id}
              id={hotel.id}
              image={`http://localhost:3001/uploads/${hotel.images[0]}`} // Asegúrate de que la imagen sea accesible
              title={hotel.hotelName}
              description={`${hotel.address}, ${hotel.city}`} // Puedes personalizar la descripción
              price={`$${hotel.price || 'N/A'} por noche`} // Si necesitas mostrar el precio
              rating={`${hotel.stars} estrellas`} // Muestra las estrellas como calificación
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExploreHotels;
