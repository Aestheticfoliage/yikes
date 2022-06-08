const sequelize = require("../config/connection");

const { Module, DataTypes } = require(sequelize);
class User extends Model{}

Project.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    }
date_created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
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
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User',
    }
);