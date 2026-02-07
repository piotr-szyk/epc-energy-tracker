
const sequelize = require("../config/connection");
const { User, Favorite } = require("../models");

const userData = require("./userData.json");
const favoriteData = require("./favoriteData.json");

const seedDatabase = async () => {
  // This wipes the DB and recreates tables based Models
  await sequelize.sync({ force: true });

  // Create Users first
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Create Favorites second
  await Favorite.bulkCreate(favoriteData);

  console.log('🚀 DATABASE SEEDED SUCCESSFULLY!');
  process.exit(0);
};

seedDatabase();