'use strict';

const company = require("./company");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    tableName: 'User',
    timestamps: true
  });

  User.associate = (models) => {
    User.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company' // Alias for the association
    });

    User.hasMany(models.Customer, {
      foreignKey: 'userId',
      as: 'customer' // Alias for the association
    });
  }

  return User;
};