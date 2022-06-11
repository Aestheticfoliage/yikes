const { Model, DataTypes } = require('sequelize');
const customer = require('../models/user');
const sequelize = require('../config/connection');

class Customer extends Model {}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      AllowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_rating: {
      type: DataTypes.INTEGER,
      references: {
        model: "customer",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "customer",
  }
);

module.exports = customer;
