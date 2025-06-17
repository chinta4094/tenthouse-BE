'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const Company = await queryInterface.createTable('Company', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
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
    Company.associate = function(models) {
      Company.hasMany(models.User, { foreignKey: 'companyId' });
    };
    return Company;
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Company');
  }
};