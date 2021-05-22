'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('etfWeeklies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ticker: {
        type: Sequelize.STRING
      },
      lowEnd: {
        type: Sequelize.FLOAT
      },
      highEnd: {
        type: Sequelize.FLOAT
      },
      currentPrice: {
        type: Sequelize.FLOAT
      },
      trend: {
        type: Sequelize.STRING
      },
      ratio: {
        type: Sequelize.FLOAT
      },
      userId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('etfWeeklies');
  }
};