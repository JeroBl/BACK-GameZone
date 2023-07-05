  
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Languages', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false
    });
};