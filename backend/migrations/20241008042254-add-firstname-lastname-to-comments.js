'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('comments', 'firstName', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('comments', 'lastName', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('comments', 'firstName');
    await queryInterface.removeColumn('comments', 'lastName');
  }
};
