'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const itemSize = sequelize.define('itemSize', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'itemSize',
    timestamps: true,
  });

  itemSize.associate = function(models) {
    // Define associations here if needed
    // For example, if itemSize has a one-to-many relationship with Item:
    itemSize.hasMany(models.Item, {
      foreignKey: 'itemSizeId',
      as: 'item'
    });
  }

  return itemSize;
}