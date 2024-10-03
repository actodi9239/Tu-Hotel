const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Rutas
app.use('/api', userRoutes);
app.use('/api', hotelRoutes);

// Sincronizar la base de datos y lanzar el servidor
sequelize.sync()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(process.env.PORT || 3001, () => {
      console.log('Server running on port 3001');
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
