const customer = {Model, DataTypes} = require('../models/user');
const sequelize = require('../config/connection');

class customer extends Model {}

customer.init(
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
    address: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.STRING,
    },
    zip: {
        type: DataTypes.INTEGER,
    },
    phone: {
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    customer_review: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customer_rating: {
        type: DataTypes.INTEGER,
        references: {
            model: 'customer',
            key: 'id',
        },
    },
    service: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.STRING
        allowNull: false,
    },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'customer',
    }
);

module.exports = customer;