const express = require("express");
const app = express();
const port = 8000;

// Route
const users = require("./src/routes/users");
const auth = require("./src/routes/auth");
const mahasiswa = require("./src/routes/mahasiswa");

// Middleware
const middlerware = require("./src/middlerware");

// Database
const connection = require("./database/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlerware.logger);

// Test Query
connection.query("SELECT 1", function (errors, results) {
  console.log("DB Connection : ", { results, errors });
});

// Routers
app.use("/users", middlerware.isAuthenticated, users);
app.use("/auth", auth);
app.use("/mahasiswa", mahasiswa);

app.listen(port, () => console.log(`App running on http://localhost:${port}`));
