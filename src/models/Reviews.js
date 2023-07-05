  
const DataTypes = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Reviews', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        reviews: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    },
    {
        timestamps: false
    });
};