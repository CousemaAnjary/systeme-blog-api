'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Publication, {
        foreignKey: 'user_id',
        as: 'publications'
      });
      User.hasMany(models.Commentaire, {
        foreignKey: 'user_id',
        as: 'commentaires'
      });
      User.hasMany(models.Reaction, {
        foreignKey: 'user_id',
        as: 'reactions'
      });
    }

    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    image: DataTypes.STRING,
    coverPhoto: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user, options) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  });
  return User;
};