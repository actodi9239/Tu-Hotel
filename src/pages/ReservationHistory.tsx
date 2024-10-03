import React from 'react';
import Navbar from '../components/Navbar';

const ReservationHistory: React.FC = () => {
  const reservations = [
    {
      id: 1,
      hotelName: 'The Ritz-Carlton',
      location: 'Miami, Florida',
      date: 'January 15, 2024',
      price: '$250',
    },
    {
      id: 2,
      hotelName: 'Hotel Nikko',
      location: 'San Francisco, California',
      date: 'March 12, 2024',
      price: '$180',
    },
  ];

  return (
    <div className="bg-[#111518] min-h-screen text-white">
      <Navbar />
      <div className="max-w-screen-md mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Reservation History</h1>
        <ul className="space-y-4">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold">{reservation.hotelName}</h3>
              <p className="text-sm text-gray-400">{reservation.location}</p>
              <p className="text-sm text-gray-400">{reservation.date}</p>
              <p className="text-sm text-gray-400">{reservation.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReservationHistory;
