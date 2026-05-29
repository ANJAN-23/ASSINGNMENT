const express = require("express");
require("dotenv").config();
const sequelize = require("./src/config/db.js");
const cors = require("cors");

const app = express();
app.use(cors());
const githubRoutes = require("./src/routes/github.routes.js");

app.use(express.json());

sequelize.authenticate()
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

app.use("/github", githubRoutes);
sequelize.sync()
  .then(() => {
    console.log("Tables synced");
  })
  .catch(err => {
    console.log(err);
  });
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});