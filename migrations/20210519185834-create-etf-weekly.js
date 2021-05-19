'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ETF_weeklies', {
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
      trend: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('ETF_weeklies');
  }
};