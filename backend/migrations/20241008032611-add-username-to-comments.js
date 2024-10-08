'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('comments', 'username', {
      type: Sequelize.STRING,
      allowNull: false, // Cambia esto a true si deseas permitir valores nulos
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('comments', 'username');
  }
};
