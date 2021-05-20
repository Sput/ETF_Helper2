'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('etf_weekly3s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      etfDataId: {
        type: Sequelize.INTEGER
      },
      ticker: {
        type: Sequelize.STRING
      },
      low_end: {
        type: Sequelize.FLOAT
      },
      high_end: {
        type: Sequelize.FLOAT
      },
      current_price: {
        type: Sequelize.FLOAT
      },
      trend: {
        type: Sequelize.STRING
      },
      ratio: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('etf_weekly3s');
  }
};