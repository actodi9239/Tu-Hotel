const express = require('express');
const cors = require('cors');
const multer = require('multer'); 
const path = require('path'); 
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes'); 
const commentRoutes = require('./routes/commentRoutes'); // Importar las rutas de comentarios
require('dotenv').config();

const app = express();

// Habilitar CORS
app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST'],         
  allowedHeaders: ['Content-Type'], 
  credentials: true                 
}));

app.use(express.json());

// Configurar multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Sirve la carpeta 'uploads' como estática para que las imágenes sean accesibles
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/api', userRoutes);
app.use('/api', hotelRoutes); 
app.use('/api', commentRoutes); // Rutas de comentarios

// Sincronizar la base de datos y lanzar el servidor
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    await sequelize.sync();
    app.listen(process.env.PORT || 3001, () => {
      console.log('Server running on port 3001');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

initializeDatabase();
