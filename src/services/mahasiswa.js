// const connection = require("../../database/connection");

// // TODO: need resolve
// async function getMahasiswa(params) {
//   let results = {
//     data: [],
//     errors: [],
//   };
//   const data = await connection.execute(
//     "SELECT * FROM mahasiswa",
//     params,
//     function (errors, rows) {
//       if (errors)
//         return (results = {
//           data: [],
//           errors,
//         });
//       else
//         return (results = {
//           data: rows,
//           errors: [],
//         });
//     }
//   );

//   return data;
// }

// const mahasiswaService = {
//   getMahasiswa,
// };

// module.exports = mahasiswaService;
