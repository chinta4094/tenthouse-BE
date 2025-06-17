'use strict';

const User = require('../models/User');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const User = await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    User.associate = function(models) {
      User.belongsTo(models.Company, { foreignKey: 'companyId' });
    };
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};