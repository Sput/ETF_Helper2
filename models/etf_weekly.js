'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ETF_weekly extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ETF_weekly.init({
    etfDataId: DataTypes.INTEGER,
    ticker: DataTypes.STRING,
    low_end: DataTypes.FLOAT,
    high_end: DataTypes.FLOAT,
    trend: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ETF_weekly',
  });
  return ETF_weekly;
};