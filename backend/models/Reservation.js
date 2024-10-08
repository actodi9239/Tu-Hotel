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

Reservation.belongsTo(Hotel); 
Reservation.belongsTo(User);  

module.exports = Reservation;
