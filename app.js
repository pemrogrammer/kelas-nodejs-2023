const express = require("express");
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const myLogger = function (req, res, next) {
  //   console.log("LOGGED");
  console.log(req.body);
  next();
};

app.use(myLogger);

// Routers
const users = require("./src/routes/users");
app.use("/users", users);

app.listen(port, () => console.log(`App running on http://localhost:${port}`));
