# 🏠 EPC Energy Tracker

A full-stack MVC application that empowers users to search, track, and analyze UK Energy Performance Certificates (EPC). This project demonstrates a complete integration of a Node/Express backend with a PostgreSQL relational database.

![Difficulty: Advanced](https://img.shields.io/badge/Difficulty-Advanced-red?style=for-the-badge)
![Topic: Full Stack MVC](https://img.shields.io/badge/Topic-Full_Stack_MVC-purple?style=for-the-badge)
![Database: PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge)

---

## 🎯 Project Goal
To transform raw government data into a personalized dashboard. Users can search properties using the official UK Government API, save them to a private profile, and receive tailored energy-saving recommendations based on real property metrics.

## 🚀 Live Demo
[View the App on Render](https://epc-energy-tracker.onrender.com/)

## 🛠️ Technical Implementation
This project showcases a professional-grade full-stack workflow:

* **MVC Architecture:** Organized using the Model-View-Controller pattern to ensure scalable and maintainable code.
* **Relational Database:** Designed with **PostgreSQL** and **Sequelize ORM**, implementing One-to-Many relationships between users, saved properties, and energy recommendations.
* **Secure Authentication:** User sessions are managed via `express-session` with password encryption using `bcrypt`.
* **RESTful API Integration:** Server-side fetching of real-time data from the Department for Levelling Up, Housing and Communities API.
* **Dynamic Templating:** Utilizing **Handlebars.js** to render logic-heavy views on the server side.

## ✨ Key Features
- **Real-time Search:** Access official UK energy data instantly.
- **Personal Dashboard:** Save properties and track energy ratings (A-G).
- **Intelligent Recommendations:** Dynamically pulls home improvement suggestions for every saved property.
- **Responsive Design:** A custom CSS interface optimized for data clarity and mobile accessibility.

## 📂 Structure
- `models/`: Database schemas and associations (Sequelize).
- `views/`: Handlebars templates for the UI.
- `controllers/`: Express routes and business logic.
- `public/`: Client-side assets (CSS, Vanilla JS).
- `server.js`: The entry point for the Express server and DB synchronization.

## ⚙️ Installation
1. Clone the repo.
2. Install dependencies: `npm install`.
3. Configure your `.env` (see `.env.EXAMPLE`).
4. Initialize the DB and start: `npm start`.
