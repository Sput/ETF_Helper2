'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('entries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      entryId: {
        type: Sequelize.INTEGER
      },
      symbol: {
        type: Sequelize.STRING
      },
      trend: {
        type: Sequelize.STRING
      },
      currentHighend: {
        type: Sequelize.FLOAT
      },
      currentLowend: {
        type: Sequelize.FLOAT
      },
      date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('entries');
  }
};