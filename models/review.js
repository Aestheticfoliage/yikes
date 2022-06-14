const { Model, DataTypes } = require('sequelize');
const review = require('../models/review');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
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
      references: {
        model: 'customer',
        key: 'id',
      },
    },

    customer: {
      type: DataTypes.STRING,
      references: {
        model: 'customer',
        key: 'id',
      },
    },

    rating: {
      type: DataTypes.INTEGER,
      references: {
        model: 'customer',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  }
);

module.exports = review;
