const express = require("express");
// const mahasiswa = require("../services/mahasiswa");
const connection = require("../../database/connection");
const router = express.Router();

// Get Mahasiswa
router.get("/", async (req, res) => {
  let query = "";
  let options = [];
  // By Prodi
  if (req.query.prodi) {
    query = "SELECT * FROM mahasiswa WHERE prodi = ?";
    options = [req.query.prodi];
  } else {
    //   All
    query = "SELECT * FROM mahasiswa";
  }

  connection.query(query, options, function (errors, rows) {
    if (errors)
      return res.status(500).json({
        status: "error",
      });

    return res.status(200).json({
      status: "success",
      data: rows,
    });
  });
});

module.exports = router;
