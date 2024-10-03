const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Hotel = require('./Hotel');

const Room = sequelize.define('Room', {
  roomType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  beds: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Room.belongsTo(Hotel); // Relación con Hotel

module.exports = Room;
