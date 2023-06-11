const connection = require("../../database/connection");

// TODO: need resolve
async function getMahasiswa() {
  return await connection.query("SELECT * FROM mahasiswa");
}

const mahasiswa = {
  getMahasiswa,
};

module.exports = mahasiswa;
