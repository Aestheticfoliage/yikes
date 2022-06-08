const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
const { Module, DataTypes } = require(sequelize);
class User extends Model{}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.STRING,
    },
    Country: {
        type: DataTypes.STRING,
    },
    zip: {
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10],
        },
    },

date_created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
},
customer_review: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
        model: 'customer',
        key: 'id',
    },
},
customer_rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'customer',
        key: 'id',
    },
},
total_reviews: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    {
        hooks: {
            beforeCreate: async (newuserData) => {
                newuserData.password = await bcrypt.hash(newuserData.password, 10);
                return newuserData;
            },
            beforeUpdate: async (updateduserData) => {
                if (updateduserData.password) {
                    updateduserData.password = await bcrypt.hash(updateduserData.password, 10);
                }
                return updateduserData;
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