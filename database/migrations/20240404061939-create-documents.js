'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      folder_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Folders',
          key: 'id'
        }
      },
      file: {
        type: Sequelize.STRING
      },
      namefile: {
        type: Sequelize.STRING
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
    await queryInterface.addIndex('Documents', ['folder_id']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Documents');
    await queryInterface.dropTable('Folders');
  }
};