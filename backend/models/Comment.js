// models/Comment.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Comment extends Model {}

Comment.init({
  // otras propiedades...
  hotelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Hotels',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Asegúrate de que 'Users' sea el nombre correcto de tu modelo
      key: 'id'
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'comments'
});

module.exports = Comment;
