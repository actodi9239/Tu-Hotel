const Comment = require('../models/Comment'); // Importar el modelo correctamente

// Asegúrate de que esto esté en tu controlador de comentarios
exports.createComment = async (req, res) => {
  try {
    const { hotelId, firstName, lastName, text } = req.body;

    // Aquí, asegúrate de que los campos no sean nulos o indefinidos
    if (!hotelId || !firstName || !lastName || !text) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newComment = await Comment.create({
      hotelId,
      firstName,
      lastName,
      text,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
};

