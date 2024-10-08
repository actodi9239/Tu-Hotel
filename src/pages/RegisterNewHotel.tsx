import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

interface Room {
  roomType: string;
  price: string;
  beds: string;
  capacity: string;
}

interface HotelData {
  hotelName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  stars: string;
  rooms: Room[];
  amenities: {
    wifi: boolean;
    pool: boolean;
    parking: boolean;
    shuttle: boolean;
    petFriendly: boolean;
  };
  images: File[];
}

const RegisterNewHotel: React.FC = () => {
  const [hotelData, setHotelData] = useState<HotelData>({
    hotelName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    stars: '5',
    rooms: [{ roomType: '', price: '', beds: '', capacity: '' }],
    amenities: {
      wifi: false,
      pool: false,
      parking: false,
      shuttle: false,
      petFriendly: false,
    },
    images: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const handleRoomChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedRooms = hotelData.rooms.map((room, i) =>
      i === index ? { ...room, [name]: value } : room
    );
    setHotelData({ ...hotelData, rooms: updatedRooms });
  };

  const addRoom = () => {
    setHotelData({
      ...hotelData,
      rooms: [...hotelData.rooms, { roomType: '', price: '', beds: '', capacity: '' }],
    });
  };

  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setHotelData({
      ...hotelData,
      amenities: { ...hotelData.amenities, [name]: checked },
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files);
      const validImages = uploadedFiles.filter((file) => file.type.startsWith('image/'));

      if (validImages.length > 0) {
        setHotelData({ ...hotelData, images: validImages });
      } else {
        console.error('Solo se permiten archivos de imagen');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    formData.append('hotelName', hotelData.hotelName);
    formData.append('address', hotelData.address);
    formData.append('city', hotelData.city);
    formData.append('state', hotelData.state);
    formData.append('zipCode', hotelData.zipCode);
    formData.append('stars', hotelData.stars);
    formData.append('rooms', JSON.stringify(hotelData.rooms)); // Asegúrate de que esto sea un objeto JSON
    formData.append('amenities', JSON.stringify(hotelData.amenities));
  
    // Añade las imágenes al FormData
    hotelData.images.forEach((image) => {
      formData.append('images', image); // Verifica que el campo 'images' es lo que multer espera
    });
  
    try {
      const response = await axios.post('http://localhost:3001/api/hotels', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Hotel creado:', response.data);
    } catch (error) {
      console.error('Error creando el hotel:', error);
    }
  };
  

  return (
    <div className="bg-[#111518] min-h-screen text-white">
      <Navbar />
      <div className="max-w-screen-md mx-auto p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-6">Add a new hotel</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Datos básicos del hotel */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Hotel Name</label>
            <input
              type="text"
              name="hotelName"
              value={hotelData.hotelName}
              onChange={handleInputChange}
              placeholder="Type here"
              required
              className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg"
            />
          </div>

          {/* Direcciones */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Address</label>
            <input
              type="text"
              name="address"
              value={hotelData.address}
              onChange={handleInputChange}
              placeholder="Type here"
              required
              className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg"
            />
          </div>

          {/* Ciudad, estado y código postal */}
          <div className="flex space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">City</label>
              <input
                type="text"
                name="city"
                value={hotelData.city}
                onChange={handleInputChange}
                placeholder="Type here"
                required
                className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">State</label>
              <input
                type="text"
                name="state"
                value={hotelData.state}
                onChange={handleInputChange}
                placeholder="Type here"
                required
                className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={hotelData.zipCode}
                onChange={handleInputChange}
                placeholder="Type here"
                required
                className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg"
              />
            </div>
          </div>

          {/* Clasificación de estrellas */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Hotel Classification</label>
            <select
              name="stars"
              value={hotelData.stars}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg"
            >
              <option value="5">5 star</option>
              <option value="4">4 star</option>
              <option value="3">3 star</option>
              <option value="2">2 star</option>
              <option value="1">1 star</option>
            </select>
          </div>

          {/* Tipos de habitación y precios */}
          <div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">Room Types, Prices, Beds, and Capacity</h3>
            {hotelData.rooms.map((room, index) => (
              <div key={index} className="space-y-4 mb-8 p-4 border border-gray-600 rounded-lg">
                <h4 className="text-sm font-bold">Room {index + 1}</h4>
                <input
                  type="text"
                  name="roomType"
                  value={room.roomType}
                  onChange={(e) => handleRoomChange(index, e)}
                  placeholder="Room Type"
                  required
                  className="px-4 py-2 bg-gray-800 text-white w-full rounded-lg"
                />
                <input
                  type="number"
                  name="price"
                  value={room.price}
                  onChange={(e) => handleRoomChange(index, e)}
                  placeholder="Price per night"
                  required
                  className="px-4 py-2 bg-gray-800 text-white w-full rounded-lg"
                />
                <input
                  type="number"
                  name="beds"
                  value={room.beds}
                  onChange={(e) => handleRoomChange(index, e)}
                  placeholder="Number of beds"
                  required
                  className="px-4 py-2 bg-gray-800 text-white w-full rounded-lg"
                />
                <input
                  type="number"
                  name="capacity"
                  value={room.capacity}
                  onChange={(e) => handleRoomChange(index, e)}
                  placeholder="Capacity (number of people)"
                  required
                  className="px-4 py-2 bg-gray-800 text-white w-full rounded-lg"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addRoom}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
            >
              Add another room
            </button>
          </div>

          {/* Servicios del hotel */}
          <div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">Amenities</h3>
            <div className="grid grid-cols-2 gap-4">
              <label>
                <input
                  type="checkbox"
                  name="wifi"
                  checked={hotelData.amenities.wifi}
                  onChange={handleAmenityChange}
                  className="mr-2"
                />
                Free Wi-Fi
              </label>
              <label>
                <input
                  type="checkbox"
                  name="pool"
                  checked={hotelData.amenities.pool}
                  onChange={handleAmenityChange}
                  className="mr-2"
                />
                Swimming Pool
              </label>
              <label>
                <input
                  type="checkbox"
                  name="parking"
                  checked={hotelData.amenities.parking}
                  onChange={handleAmenityChange}
                  className="mr-2"
                />
                Free Parking
              </label>
              <label>
                <input
                  type="checkbox"
                  name="shuttle"
                  checked={hotelData.amenities.shuttle}
                  onChange={handleAmenityChange}
                  className="mr-2"
                />
                Airport Shuttle
              </label>
              <label>
                <input
                  type="checkbox"
                  name="petFriendly"
                  checked={hotelData.amenities.petFriendly}
                  onChange={handleAmenityChange}
                  className="mr-2"
                />
                Pet-Friendly
              </label>
            </div>
          </div>

          {/* Subir imágenes */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Hotel Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg"
            />
          </div>

          {/* Botón para enviar */}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
          >
            Add Hotel
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterNewHotel;
