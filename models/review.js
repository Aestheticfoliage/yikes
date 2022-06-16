const { Model, DataTypes } = require('sequelize');
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

    // first_name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   references: {
    //     model: 'customer',
    //     key: 'id',
    //   },
    // },
    // last_name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   references: {
    //     model: 'customer',
    //     key: 'id',
    //   },
    // },
    customer_review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateCreated: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  }
);

module.exports = Review;
