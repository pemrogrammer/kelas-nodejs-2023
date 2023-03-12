const express = require("express");
const router = express.Router();
const dataUsers = require("../constants/users");

// users/
router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "List data users",
    data: dataUsers,
  });
});

// Routing menggunakan Parameter
// users/detail/:userId
router.get("/detail/:userId", (req, res) => {
  const user = dataUsers.find((user) => user.id == req.params.userId);

  if (user) {
    return res.status(200).json({
      status: "success",
      message: "Data user found",
      data: user,
    });
  }

  res.status(404).json({
    status: "erorr",
    message: "User not found",
    data: [],
  });
});

// Routing menggunakan Optional Parameter
// users/grade/:grade?
router.get("/grade/:grade?", (req, res) => {
  const users = dataUsers.filter((user) => user.grade == req.params.grade);

  if (users) {
    return res.status(200).json({
      status: "success",
      message: "Data user found",
      data: users,
    });
  }

  res.status(404).json({
    status: "error",
    message: "Data not found",
    data: [],
  });
});

// Routing menggunakan Query Parameter
// users/query
router.get("/query", (req, res) => {
  const users = dataUsers.filter((user) =>
    user.name.toLowerCase().includes(req.query.name.toLowerCase())
  );

  if (users) {
    return res.status(200).json({
      status: "success",
      message: "Data user found",
      data: users,
    });
  }

  res.status(404).json({
    status: "error",
    message: "Data not found",
    data: [],
  });
});

// Routing menggunkan POST untuk menambahkan data baru
// users/create
router.post("/create", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Data created",
    data: req.body,
  });
});

module.exports = router;
