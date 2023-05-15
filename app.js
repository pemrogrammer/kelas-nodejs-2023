const express = require("express");
const app = express();
const port = 8000;
const users = require("./src/routes/users");
const auth = require("./src/routes/auth");
const middlerware = require("./src/middlerware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlerware.logger);

// Routers
app.use("/users", middlerware.isAuthenticated, users);
app.use("/auth", auth);

app.listen(port, () => console.log(`App running on http://localhost:${port}`));
