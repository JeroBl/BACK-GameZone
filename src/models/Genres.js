const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Genres', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false
    });
}; 
