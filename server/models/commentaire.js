'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commentaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Commentaire.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Commentaire.belongsTo(models.Publication, {
        foreignKey: 'publication_id',
        as: 'publication'
      });
    }
  }
  Commentaire.init({
    user_id: DataTypes.INTEGER,
    publication_id: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Commentaire',
  });
  return Commentaire;
};