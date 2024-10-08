const express = require('express');
const { register, login } = require('../controllers/userController');  
const { createComment } = require('../controllers/commentController'); // Asegúrate de que la importación sea correcta

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/comments', createComment); // Ruta para crear comentarios

module.exports = router;
