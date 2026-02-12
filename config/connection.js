
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
  // 🚀 RENDER (PRODUCTION) SETTINGS
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Necessary for Render's self-signed certificates
      }
    }
  });
} else {
  // 💻 LOCALHOST (DEVELOPMENT) SETTINGS
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
      port: 5432
    }
  );
}

module.exports = sequelize;