const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Comment = require('./Comment'); // Asegúrate de que la ruta es correcta

class Hotel extends Model {}

Hotel.init({
  hotelName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stars: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rooms: {
    type: DataTypes.JSON, // Cambia según sea necesario
    allowNull: false,
  },
  amenities: {
    type: DataTypes.JSON, // Cambia según sea necesario
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Hotel',
});

// Define la relación entre Hotel y Comment
Hotel.hasMany(Comment, { foreignKey: 'hotelId' });
Comment.belongsTo(Hotel, { foreignKey: 'hotelId' });

module.exports = Hotel;
