import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CardExplore from '../components/CardExplore';

const ExploreHotels: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: '',
    rooms: '',
    guests: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    // Implementar la lógica de búsqueda
    console.log('Realizando búsqueda con:', searchParams);
  };

  const hotels = [
    {
      id: "1",
      image: "/src/assets/hotel1.jpg",
      title: "The Ritz-Carlton Key Biscayne",
      description: "Alojamiento entero • 1 habitación • Vistas al mar",
      price: "$250 por noche",
      rating: "4.7 (44)",
    },
    {
      id: "2",
      image: "/src/assets/hotel2.jpg",
      title: "Hotel Nikko",
      description: "Alojamiento entero • 2 habitaciones",
      price: "$180 por noche",
      rating: "4.5 (100)",
    }
  ];

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
          {hotels.map((hotel) => (
            <CardExplore
              key={hotel.id}
              id={hotel.id}
              image={hotel.image}
              title={hotel.title}
              description={hotel.description}
              price={hotel.price}
              rating={hotel.rating}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExploreHotels;
