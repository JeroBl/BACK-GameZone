const DataTypes = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Games', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false
    },

    required_age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    is_free: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },

    detailed_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    controller_support: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    release_date: {
      type: DataTypes.STRING,
      allowNull: true
    },

    coming_soon: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },

    currency: {
      type: DataTypes.STRING,
      allowNull: true
    },

    price_overview: {
      type: DataTypes.STRING,
      allowNull: true
    },

    header_image: {
      type: DataTypes.STRING,
      allowNull: false
    },

    capsule_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ban: {
       type: DataTypes.BOOLEAN,
       allowNull: false
    },
    pc_requirements: {
      type: DataTypes.JSON,
      allowNull: false
    },  

  },
    {
      timestamps: false
    });
};
