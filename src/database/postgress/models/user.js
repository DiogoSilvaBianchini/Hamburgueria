'use strict';
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
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number_house: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    buy_list:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    } 
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};