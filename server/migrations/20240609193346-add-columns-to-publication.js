'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Publications', 'title', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Publications', 'category', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Publications', 'title');
    await queryInterface.removeColumn('Publications', 'category');
  }
};
