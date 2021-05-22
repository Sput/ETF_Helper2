'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class etfWeekly extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.etfWeekly.belongsTo(models.user);
    }
  };
  etfWeekly.init({
    ticker: DataTypes.STRING,
    lowEnd: DataTypes.FLOAT,
    highEnd: DataTypes.FLOAT,
    currentPrice: DataTypes.FLOAT,
    trend: DataTypes.STRING,
    ratio: DataTypes.FLOAT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'etfWeekly',
  });
  return etfWeekly;
};