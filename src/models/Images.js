const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Images', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: false
    });
};