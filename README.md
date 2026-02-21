# 🏠 EPC Energy Tracker

A full-stack web application that allows users to search for UK Energy Performance Certificates (EPC) and save properties to a personal dashboard with tailored energy-saving recommendations.

## 🚀 Live Demo
[View the App on Render](https://epc-energy-tracker.onrender.com/)

## ✨ Key Features
* **UK Gov API Integration:** Fetches real-time energy data using the Department for Levelling Up, Housing and Communities API.
* **Relational Data Mapping:** Implements a One-to-Many relationship between saved properties and their specific energy improvement recommendations.
* **Dynamic UI:** Built with Handlebars.js and custom CSS for a modern, high-contrast Energy Rating visualization.
* **User Authentication:** Secure login system using Express-Session and BCrypt for password hashing.

## 🛠️ Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL, Sequelize ORM
* **Frontend:** Handlebars.js, Vanilla JavaScript, CSS3
* **Deployment:** Render (Web Service + Managed PostgreSQL)

## 🏗️ Database Architecture
The application uses a relational schema to ensure data integrity:
- **Users**: Manages account credentials.
- **Favorites**: Stores property details (Address, Rating, Scores).
- **Recommendations**: Linked to Favorites via `favorite_id` to provide specific home improvement data.

## ⚙️ Installation & Setup
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file with:
   ```env
   DB_NAME=epc_db
   DB_USER=your_user
   DB_PASSWORD=your_password
   EPC_API_KEY=your_key
   EPC_API_EMAIL=your_email
   SESSION_SECRET=your_secret

4. Initialize the Database:
The application uses Sequelize sync. On first run, the server will create the users, favorite, and recommendation tables automatically.

Bash
# Ensure sequelize.sync({ alter: true }) is set in server.js for the first run
node server.js

5. Start the Application:

Bash
npm start

🔮 Future Enhancements
Cost Comparison: Adding a calculator to estimate total savings based on implemented recommendations.

Map Integration: Visualizing property locations using the Google Maps API.

Admin Dashboard: Tools to view aggregated energy trends across different postcodes.

🛡️ License
Distributed under the MIT License. See LICENSE for more information.