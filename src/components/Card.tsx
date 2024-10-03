import React from 'react';

interface CardProps {
  image: string;
  title: string;
  description?: string;
  price?: string;
}

const Card: React.FC<CardProps> = ({ image, title, description, price }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <img src={image} alt={title} className="w-full h-[250px] object-cover rounded-lg" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        {description && <p className="text-sm text-gray-300">{description}</p>}
        {price && <p className="text-sm text-gray-300">{price}</p>}
      </div>
    </div>
  );
};

export default Card;
