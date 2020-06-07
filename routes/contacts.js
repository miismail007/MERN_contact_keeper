const express = require("express");
const router = express.Router();

//get contact
router.get("/:id", (req, res) => {
  res.json({ msg: "welcome" });
});

//add contact
router.post("/", (req, res) => {
  res.json({ msg: "welcome" });
});

//update contact
router.put("/:id", (req, res) => {
  res.json({ msg: "welcome" });
});

//delete contact
router.delete("/:id", (req, res) => {
  res.json({ msg: "welcome" });
});
module.exports = router;
