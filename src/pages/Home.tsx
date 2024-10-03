import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

const Home: React.FC = () => {
  return (
    <div className="bg-[#111518] min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <header
        className="relative mt-6 h-[700px] md:h-[600px] lg:h-[550px] bg-cover bg-center rounded-lg shadow-lg mx-auto max-w-screen-xl px-4 lg:px-6"
        style={{ backgroundImage: 'url(/src/assets/header.jpg)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
        <div className="relative flex flex-col justify-end h-full p-4 lg:p-8">
          <h1 className="text-5xl md:text-4xl lg:text-3xl font-bold leading-none mb-2">
            Experience the world in style
          </h1>
          <p className="text-md md:text-sm mb-4 lg:mb-6 max-w-full">
            Discover a new standard of luxury travel. Find the perfect place to stay for your next vacation.
          </p>

          {/* Contenedor de la barra de búsqueda */}
          <div className="flex items-center bg-black bg-opacity-50 p-1 md:p-2 rounded-full shadow-md w-full max-w-sm">
            <input
              type="text"
              placeholder="Where are you going?"
              className="flex-grow px-2 py-1 md:px-3 md:py-2 bg-transparent text-white placeholder-gray-300 focus:outline-none text-sm md:text-base"
            />
            <button className="ml-2 md:ml-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 md:py-2 md:px-6 rounded-full shadow-md text-sm">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Amenity Section */}
      <section className="py-10 max-w-screen-xl mx-auto px-4 lg:px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Explore top-rated amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Card image="/src/assets/hotel1.jpg" title="Entire homes" description="Comfortable private places, with room for friends or family" />
          <Card image="/src/assets/hotel2.jpg" title="Unique stays" description="One-of-a-kind spaces that make a statement" />
          <Card image="/src/assets/hotel3.jpg" title="Pet-friendly" description="Take your best friend on your next trip" />
          <Card image="/src/assets/hotel4.jpg" title="Free cancellation" description="Book without worrying about change fees" />
          <Card image="/src/assets/hotel5.jpg" title="Experiences" description="Guided adventures by local experts" />
        </div>
      </section>

      {/* Vacation Rentals Section */}
      <section className="py-10 max-w-screen-xl mx-auto px-4 lg:px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Vacation rentals for every style</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Card image="/src/assets/hotel1.jpg" title="Modern luxury hotel" price="$120/night" />
          <Card image="/src/assets/hotel2.jpg" title="Cozy beachfront bungalow" price="$150/night" />
          <Card image="/src/assets/hotel3.jpg" title="Urban chic loft" price="$180/night" />
          <Card image="/src/assets/hotel4.jpg" title="Rustic mountain cabin" price="$200/night" />
        </div>
      </section>
    </div>
  );
};

export default Home;
