'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'stripe_product_ID', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await queryInterface.addColumn('products', 'stripe_price_ID', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'stripe_product_ID')
    await queryInterface.removeColumn('products', 'stripe_price_ID')
  }
};
