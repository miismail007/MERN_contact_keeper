const express = require("express");
const router = express.Router();

//register a user
router.post("/", (req, res) => {
  res.json({ msg: "welcome" });
});

module.exports = router;
