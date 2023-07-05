const { DataTypes, ENUM } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Users', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("users", "admin"),
            defaultValue: "users",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        confirmPassword : {
            type : DataTypes.STRING
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ban: {
            type: DataTypes.BOOLEAN,
            allowNull: false
         }, 
    },
        {
            timestamps: false
        });
};