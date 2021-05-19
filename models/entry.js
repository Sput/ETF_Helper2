'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  entry.init({
    entryId: DataTypes.INTEGER,
    symbol: DataTypes.STRING,
    trend: DataTypes.STRING,
    currentHighend: DataTypes.FLOAT,
    currentLowend: DataTypes.FLOAT,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'entry',
  });
  return entry;
};