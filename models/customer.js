'use strict';

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      tableName: 'Customer',
      timestamps: true,
    }
  );

  // Define associations
  Customer.associate = (models) => {
    Customer.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user', // Alias for the association
    });
    Customer.belongsTo(models.Address, {
      foreignKey: 'addressId',
      as : 'address'
    })
  };

  return Customer;
};
