  
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Publishers', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        publisher: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false
    });
};