'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.note.belongsTo(models.user)
      models.note.belongsTo(models.plant)
    }
  };
  note.init({
    userId: DataTypes.INTEGER,
    plantId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    note: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'note',
  });
  return note;
};