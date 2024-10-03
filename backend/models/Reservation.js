const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Hotel = require('./Hotel');
const User = require('./User');

const Reservation = sequelize.define('Reservation', {
  checkInDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  checkOutDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

Reservation.belongsTo(Hotel); // Relación con Hotel
Reservation.belongsTo(User);  // Relación con Usuario

module.exports = Reservation;
