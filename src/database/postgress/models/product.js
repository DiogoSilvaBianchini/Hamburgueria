'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    }
  }
  Product.init({
    title: DataTypes.STRING,
    describe: DataTypes.STRING,
    price: DataTypes.STRING,
    imgs: { 
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    stripe_product_ID: DataTypes.STRING,
    stripe_price_ID: DataTypes.STRING,
    ingredients: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Product',
    tableName: "products"
  });
  return Product;
};