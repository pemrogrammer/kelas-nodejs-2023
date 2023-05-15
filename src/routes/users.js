const express = require("express");
const router = express.Router();
const dataUsers = require("../constants/users");
const middlerware = require("../middlerware");

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

  if (users.length !== 0) {
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
router.post("/create", middlerware.isAdministrator, (req, res) => {
  const user = dataUsers.find((data) => data.name == req.body.name);

  if (user) {
    return res.status(200).json({
      status: "error",
      message: "Name already exists",
      data: [],
    });
  }

  const dataBaru = {
    id: dataUsers.length + 1,
    name: req.body.name,
    grade: req.body.grade,
  };

  dataUsers.push(dataBaru);

  return res.status(201).json({
    status: "success",
    message: "Data created",
    data: dataBaru,
  });
});

// Routing Menggunakan PATCH untuk mengubah data
// users/update/:userId
router.patch("/update/:userId", (req, res) => {
  const index = dataUsers.findIndex((user) => user.id == req.params.userId);

  if (index > -1) {
    const user = dataUsers.find((data) => data.name == req.body.name);

    if (user) {
      return res.status(200).json({
        status: "error",
        message: "Name already exists",
        data: [],
      });
    }

    dataUsers[index].name = req.body.name;
    dataUsers[index].grade = req.body.grade;

    return res.status(200).json({
      status: "success",
      message: "Data updated",
      data: dataUsers[index],
    });
  }

  return res.status(404).json({
    status: "error",
    message: "Data not found",
    data: [],
  });
});

// Routing menggunakan DELETE untuk menghapus data
// users/delete/:userId
router.delete("/delete/:userId", (req, res) => {
  const index = dataUsers.findIndex((user) => user.id == req.params.userId);

  if (index > -1) {
    dataUsers.splice(index, 1);

    return res.status(200).json({
      status: "success",
      message: "Data deleted",
      data: dataUsers,
    });
  }

  return res.status(404).json({
    status: "error",
    message: "User not found",
    data: [],
  });
});

router.delete("/delete-by-name/:username", (req, res) => {
  const index = dataUsers.findIndex(
    (user) => user.name.toLowerCase() == req.params.username.toLowerCase()
  );
  // const index = dataUsers.findIndex((user) =>
  //   user.name.toLowerCase().includes(req.params.username.toLowerCase())
  // );

  if (index > -1) {
    dataUsers.splice(index, 1);

    return res.status(200).json({
      status: "success",
      message: "Data deleted",
      data: dataUsers,
    });
  }

  return res.status(404).json({
    status: "error",
    message: "User not found",
    data: [],
  });
});

module.exports = router;
