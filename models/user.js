const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
// const { trim } = require('lodash');


class User extends Model {
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init({
    
    id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    business_name: {
        type: DataTypes.STRING,
        allowNull: false,
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
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User',
    }
);

module.exports = User;