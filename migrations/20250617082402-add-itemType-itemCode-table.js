'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('Item', 'itemSizeId', DataTypes.INTEGER);
     await queryInterface.addColumn('Item', 'itemTypeId', DataTypes.INTEGER);
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn('Item', 'itemSizeId', DataTypes.INTEGER);
    await queryInterface.removeColumn('Item', 'itemTypeId', DataTypes.INTEGER);
  }
};
