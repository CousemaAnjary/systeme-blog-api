'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Commentaires', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // nom de la table référencée
          key: 'id'       // clé primaire de la table référencée
        },
        onUpdate: 'CASCADE', // options de mise à jour
        onDelete: 'CASCADE'  // options de suppression
      },
      publication_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Publications', // nom de la table référencée
          key: 'id'              // clé primaire de la table référencée
        },
        onUpdate: 'CASCADE', // options de mise à jour
        onDelete: 'CASCADE'  // options de suppression
      },
      content: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Commentaires');
  }
};
