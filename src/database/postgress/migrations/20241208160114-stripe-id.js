'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("products", "stripe_product_ID", { 
      type: Sequelize.STRING,
      allowNull: true 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("products", "stripe_product_ID");
  }
};
