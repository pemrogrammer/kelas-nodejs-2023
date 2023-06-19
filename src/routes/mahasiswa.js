const express = require("express");
const connection = require("../../database/connection");
// const mahasiswaService = require("../services/mahasiswa");
const router = express.Router();

// Get Mahasiswa
router.get("/", async (req, res) => {
  let query = "SELECT * FROM mahasiswa";
  let params = [];

  // By Prodi & Nama
  if (req.query.prodi && req.query.nama) {
    query += " WHERE prodi = ? AND nama LIKE ?";
    params = [req.query.prodi, `%${req.query.nama}%`];
  } else if (req.query.prodi) {
    // By Prodi
    query += " WHERE prodi = ?";
    params = [req.query.prodi];
  } else if (req.query.nama) {
    // By Nama
    query += " WHERE nama LIKE ?";
    params = [`%${req.query.nama}%`];
  }

  connection.execute(query, params, function (errors, rows) {
    if (errors) {
      console.log(errors);
      return res.status(500).json({
        status: "error",
      });
    }

    return res.status(200).json({
      status: "success",
      data: rows,
    });
  });
});

router.post("/create", async (req, res) => {
  const { nim, nama, jenis_kelamin, prodi, jurusan } = req.body;

  connection.execute(
    "SELECT * FROM mahasiswa WHERE nim = ?",
    [nim],
    function (errors, rows) {
      if (errors) {
        console.log(errors);
        return res.status(500).json({ status: "errors" });
      }

      if (rows.length > 0) {
        return res
          .status(200)
          .json({ status: "error", message: "NIM sudah digunakan." });
      }

      connection.execute(
        "INSERT INTO mahasiswa (nim, nama, jenis_kelamin, prodi, jurusan) VALUES (?, ?, ?, ?, ?)",
        [nim, nama, jenis_kelamin, prodi, jurusan],
        function (errors, _) {
          if (errors) {
            console.log(errors);
            return res.status(500).json({
              status: "error",
            });
          }

          return res.status(200).json({ status: "success", data: req.body });
        }
      );
    }
  );
});

module.exports = router;
