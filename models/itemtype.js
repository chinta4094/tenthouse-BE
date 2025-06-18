'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const ItemType = sequelize.define('ItemType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'ItemType',
    timestamps: true,
});

  ItemType.associate = function(models) {
    // Define associations here if needed
    // For example, if ItemType has a one-to-many relationship with Item:
    ItemType.hasMany(models.Item, {
      foreignKey: 'itemTypeId',
      as: 'items'
    });
  };

  return ItemType;
}