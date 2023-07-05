 
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Categories', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false
    });
};