'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class current extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.current.belongsTo(models.user);
      models.current.hasMany(models.historic);
      models.current.belongsTo(models.equity);
    }
  };
  current.init({
    userId: DataTypes.INTEGER,
    ticker: DataTypes.STRING,
    longname: DataTypes.STRING,
    trend: DataTypes.STRING,
    currentHighend: DataTypes.FLOAT,
    currentLowend: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'current',
  });
  return current;
};