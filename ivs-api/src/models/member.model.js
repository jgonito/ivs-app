const Sequelize = require('sequelize');

class Member extends Sequelize.Model {}

module.exports = (sequelize, DataTypes) => {
    Member.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        timestamps: false
    });
    
    return Member;
};