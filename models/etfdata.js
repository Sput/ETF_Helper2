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
     */
    static associate(models) {
      // define association here
      //models.etfdata.hasMany(models.etf_weekly3);
      //models.etfdata.belongsTo(models.user);
    }
  };
  etfData.init({
    entryId: DataTypes.INTEGER,
    symbol: DataTypes.STRING,
    long_name: DataTypes.STRING,
    industry: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'etfData',
  });
  return etfData;
};