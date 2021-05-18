'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class equity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.equity.hasMany(models.current);
    }
  };
  equity.init({
    currentId: DataTypes.INTEGER,
    ticker: DataTypes.STRING,
    longname: DataTypes.STRING,
    industry: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'equity',
  });
  return equity;
};