import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CardExploreProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  rating: string;
}

const CardExplore: React.FC<CardExploreProps> = ({ id, image, title, description, price, rating }) => {
  const navigate = useNavigate();

  const handleMoreInfo = () => {
    // Navega a la página de detalles con el ID del hotel
    navigate(`/hotel-details/${id}`);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start rounded-lg overflow-hidden">
      {/* Imagen del hotel */}
      <img src={image} alt={title} className="w-full lg:w-1/3 h-auto object-cover rounded-lg" />

      {/* Contenido del hotel */}
      <div className="p-6 w-full lg:w-2/3 flex flex-col justify-between">
        {/* Detalles del hotel */}
        <div>
          <p className="text-sm text-gray-400 mb-2">Alojamiento entero • 1 habitación</p>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-sm text-gray-400 mt-2">{description}</p>
          <p className="text-sm text-gray-400 mt-2">{rating}</p>
          <p className="text-lg font-bold mt-2">{price}</p> {/* Mostrar el precio */}
        </div>

        {/* Botón de "Más información" */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleMoreInfo}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
          >
            Más información
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardExplore;
