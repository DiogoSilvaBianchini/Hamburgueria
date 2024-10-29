'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'favorytes', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'favorytes')
  }
};
