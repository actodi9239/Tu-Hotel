'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('comments', 'text', {
      type: Sequelize.TEXT, // Tipo de dato según tus necesidades
      allowNull: false, // Cambia esto a true si deseas permitir valores nulos
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('comments', 'text');
  }
};
