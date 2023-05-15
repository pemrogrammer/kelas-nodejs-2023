const express = require("express");
const router = express.Router();

// POST /auth/login
router.post("/login", function (req, res) {
  if (req.body.username === "admin" && req.body.password === "admin") {
    return res.status(200).json({
      message: "success",
      username: "admin",
      fullname: "Administrator",
      role: "admin",
      token:
        "alksjdhilukjoeiujsalkdhkasjdhkjabsldhasoduyhaiowhjd.asldhasd.,ansdlaishkd.an",
    });
  }

  return res.status(401).json({
    message: "error",
    description: "Invalid username or password",
  });
});

module.exports = router;
