'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'Company',
    timestamps: true
  });

  Company.associate = function(models) {
    // associations can be defined here
    // Example: Company.hasMany(models.User, { foreignKey: 'companyId' });
  };

  return Company;
};