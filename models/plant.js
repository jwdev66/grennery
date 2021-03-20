'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.plant.belongsTo(models.user)
      models.plant.hasMany(models.comment)
      models.plant.hasMany(models.note)
    }
  };
  plant.init({
    name: DataTypes.STRING,
    scientific_name: DataTypes.STRING,
    zone_id: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'plant',
  });
  return plant;
};