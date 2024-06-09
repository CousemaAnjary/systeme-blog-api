'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publication.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Publication.hasMany(models.Commentaire, {
        foreignKey: 'publication_id',
        as: 'commentaires'
      });
      Publication.hasMany(models.Reaction, {
        foreignKey: 'publication_id',
        as: 'reactions'
      });
    }
  }
  Publication.init({
    user_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publication',
  });
  return Publication;
};