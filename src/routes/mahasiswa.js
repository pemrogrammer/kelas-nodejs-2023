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

// Create New Mahasiswa
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

// Detail Mahasiswa by NIM
router.get("/show/:nim", async (req, res) => {
  const { nim } = req.params;

  connection.execute(
    "SELECT * FROM mahasiswa WHERE nim = ?",
    [atob(nim)],
    function (errors, row) {
      if (errors) {
        console.log(errors);
        return res.status(500).json({ status: "error" });
      }

      if (row.length > 0)
        return res.status(200).json({ status: "success", data: row });

      return res
        .status(404)
        .json({ status: "error", message: "Data tidak ditemukan." });
    }
  );
});

// Update Mahasiswa by NIM
router.patch("/update/:nim", async (req, res) => {
  const { nim } = req.params;
  const { nama, jenis_kelamin, prodi, jurusan } = req.body;

  connection.execute(
    "SELECT * FROM mahasiswa WHERE nim = ?",
    [atob(nim)],
    function (errors, row) {
      if (errors) {
        console.log(errors);
        return res.status(500).json({ status: "error" });
      }

      if (row.length === 0)
        return res
          .status(404)
          .json({ status: "error", message: "Data tidak ditemukan." });

      connection.execute(
        "UPDATE mahasiswa SET nama = ?, jenis_kelamin = ?, prodi = ?, jurusan = ? WHERE nim = ?",
        [
          nama === "" ? row[0].nama : nama,
          jenis_kelamin === "" ? row[0].jenis_kelamin : jenis_kelamin,
          prodi === "" ? row[0].prodi : prodi,
          jurusan === "" ? row[0].jurusan : jurusan,
          atob(nim),
        ],
        function (error, result) {
          if (error) {
            console.log("ERROR", error);
            return res.status(500).json({ status: "error" });
          }

          if (result.affectedRows === 1)
            return res.status(200).json({
              status: "success",
              message: "Data berhasil diubah.",
            });

          return res
            .status(500)
            .json({ status: "error", message: "Data tidak dapat diubah." });
        }
      );
    }
  );
});

module.exports = router;
