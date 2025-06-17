'use strict';

module.exports = (sequelize, DataTypes) => {
 const Address = sequelize.define('Address', {
    street: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    pincode: {
      type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    tableName: 'Address',
    timestamps: true
  });

  Address.associate = (models) => {
    Address.hasMany(models.Customer, {
      foreignKey: 'addressId',
      as : 'address'
    })
  }

  return Address
};