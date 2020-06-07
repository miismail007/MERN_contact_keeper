const express = require("express");
const router = express.Router();

//to get logged in user

router.get("/", (req, res) => {
  res.json({ msg: "welcome" });
});

//to login user

router.post("/", (req, res) => {
  res.json({ msg: "welcome" });
});

module.exports = router;
