'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.historic.belongsTo(models.current);
    }
  };
  historic.init({
    currentId: DataTypes.INTEGER,
    ticker: DataTypes.STRING,
    longname: DataTypes.STRING,
    trend: DataTypes.STRING,
    currentHighend: DataTypes.FLOAT,
    currentLowend: DataTypes.FLOAT,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'historic',
  });
  return historic;
};