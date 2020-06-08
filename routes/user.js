const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

//register a user
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "please include valid email").isEmail(),
    check("password", "please input with 6 or more character").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res.json({ msg: "user already exist" });
      }

      user = User({
        name: name,
        email: email,
        password: password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      //payload for jwt
      const payload = {
        user: {
          id: user.id,
        },
      };
      //to use jwt we need to sign
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(400).send("server error");
    }
  }
);

module.exports = router;
