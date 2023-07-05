const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Videos', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        video: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: false
    });
};