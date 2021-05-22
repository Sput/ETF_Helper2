'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class etfData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * certain number of etf that you track and each week you will get the
     * financials
     */
    static associate(models) {
      // define association here
      models.etfData.belongsTo(models.user);
    }
  };
  etfData.init({
    symbol: DataTypes.STRING,
    longName: DataTypes.STRING,
    industry: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'etfData',
  });
  return etfData;
};