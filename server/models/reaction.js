'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reaction.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Reaction.belongsTo(models.Publication, {
        foreignKey: 'publication_id',
        as: 'publication'
      });
    }
  }
  Reaction.init({
    user_id: DataTypes.INTEGER,
    publication_id: DataTypes.INTEGER,
    type: DataTypes.ENUM('like', 'love', 'haha', 'sad', 'grrr')
  }, {
    sequelize,
    modelName: 'Reaction',
  });
  return Reaction;
};