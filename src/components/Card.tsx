import React from 'react';

interface CardProps {
  image: string;
  title: string;
  description?: string;
  price?: string;
  rating?: number;
  info?: string;  // Nueva propiedad `info` para añadir más detalles
}

const Card: React.FC<CardProps> = ({ image, title, description, price, rating, info }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-[#1c1e22]">
      <img src={image} alt={title} className="w-full h-[150px] object-cover rounded-lg" />  {/* Reducí el tamaño de la imagen */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        {description && <p className="text-sm text-gray-400 mt-2">{description}</p>}
        {price && <p className="text-md font-semibold text-white mt-2">{price}</p>}
        {rating && (
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 text-sm font-bold">{rating}</span>
            <span className="ml-1 text-sm text-gray-400">/ 5</span>
          </div>
        )}
        {info && <p className="text-sm text-gray-400 mt-2">{info}</p>}  {/* Nueva línea para mostrar información adicional */}
      </div>
    </div>
  );
};

export default Card;
