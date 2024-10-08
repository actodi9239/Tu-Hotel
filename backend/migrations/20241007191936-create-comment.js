module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Comments', {
          id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
          },
          hotelId: {
              type: Sequelize.INTEGER,
              references: {
                  model: 'Hotels',
                  key: 'id',
              },
              onDelete: 'CASCADE',
          },
          userId: {
              type: Sequelize.INTEGER,
              allowNull: false, // Asegúrate de que no sea nulo
          },
          firstName: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          lastName: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          text: {
              type: Sequelize.TEXT,
              allowNull: false,
          },
          createdAt: {
              type: Sequelize.DATE,
              allowNull: false,
          },
          updatedAt: {
              type: Sequelize.DATE,
              allowNull: false,
          },
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Comments');
  },
};
