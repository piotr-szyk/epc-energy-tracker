require("dotenv").config();
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers"); // Keep your existing helpers
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

// Merge your existing helpers with the new ones needed for the EPC grid
const hbs = exphbs.create({ 
  helpers: {
    ...helpers,
    split: (str) => str.split(','),
    eq: (a, b) => a === b
  }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`🌐 Server listening on http://localhost:${PORT}`),
  );
});