const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Favorite extends Model {}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    current_rating: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    current_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    potential_rating: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    potential_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lmk_key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', 
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'favorite',
  }
);

module.exports = Favorite;