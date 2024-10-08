// routes/commentRoutes.js
const express = require('express');
const { createComment } = require('../controllers/commentController');
const router = express.Router();

// Ruta para crear un nuevo comentario
router.post('/comments', createComment);

module.exports = router;
