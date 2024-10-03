const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hotel = sequelize.define('Hotel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pricePerNight: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

module.exports = Hotel;
