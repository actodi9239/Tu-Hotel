const express = require('express');
const { createHotel, getHotels, getHotelDetails } = require('../controllers/hotelController');
const multer = require('multer');
const router = express.Router();

// Configurar almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Define las rutas
router.post('/hotels', upload.array('images', 5), createHotel);
router.get('/hotels', getHotels);
router.get('/hotels/:id', getHotelDetails); // Asegúrate de que esta ruta esté aquí

module.exports = router;
