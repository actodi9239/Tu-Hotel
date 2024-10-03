const express = require('express');
const { createHotel, getHotels, getHotelById } = require('../controllers/hotelController');
const router = express.Router();

router.post('/hotels', createHotel);
router.get('/hotels', getHotels);
router.get('/hotels/:id', getHotelById);

module.exports = router;
