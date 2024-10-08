const Hotel = require('../models/Hotel');
const Comment = require('../models/Comment');

exports.createHotel = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    const { hotelName, address, city, state, zipCode, stars, rooms, amenities } = req.body;

    let parsedRooms = [];
    let parsedAmenities = {};

    if (rooms) {
      parsedRooms = JSON.parse(rooms);
    }
    if (amenities) {
      parsedAmenities = JSON.parse(amenities);
    }

    const imageFiles = req.files.map(file => file.filename);

    const hotel = await Hotel.create({
      hotelName,
      address,
      city,
      state,
      zipCode,
      stars,
      rooms: parsedRooms,
      amenities: parsedAmenities,
      images: imageFiles
    });

    res.status(201).json(hotel);
  } catch (error) {
    console.error('Error al crear hotel:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error al obtener hoteles:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener un hotel por ID, incluyendo comentarios
exports.getHotelDetails = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id, {
      include: [{ model: Comment }]
    });

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel no encontrado' });
    }

    const comments = hotel.Comments.map(comment => ({
      username: comment.username,
      text: comment.text,
    }));

    // Asegúrate de que amenities y rooms sean objetos
    const amenities = JSON.parse(hotel.amenities || '{}');
    const rooms = JSON.parse(hotel.rooms || '[]');

    res.status(200).json({
      hotel: {
        ...hotel.dataValues, // Copia todas las propiedades del hotel
        comments: comments, // Incluye los comentarios
        amenities: amenities, // Añade las amenities
        rooms: rooms // Añade las rooms
      },
    });
  } catch (error) {
    console.error('Error al obtener los detalles del hotel:', error);
    res.status(500).json({ error: error.message });
  }
};
