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
      models.plant.hasMany(models.note)
      models.plant.hasMany(models.comment)
    }
  };
  plant.init({
    name: DataTypes.STRING,
    scientificName: DataTypes.STRING,
    nickname: DataTypes.STRING,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'plant',
  });
  return plant;
};