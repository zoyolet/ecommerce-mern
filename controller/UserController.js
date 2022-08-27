var express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./../models/Users");
var router = express.Router();
const salt = 10;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/login", function (req, res, next) {
  res.send("login with a resource");
});

router.get("/signup", async function (req, res, next) {
  res.render("signup");
});

router.post("/signup", async function (req, res, next) {
  try {
    if (req.body.password != req.body.verifypassword) {
      res.send("Passwords do not match");
    }
    let user = req.body;
    user.password = bcrypt.hashSync(user.password, salt);
    console.log(user.password);
    let userDB = new User(user);
    await userDB.save();
    res.send("Registered successfully");
  } catch (e) {
    console.log(e);
    res.send("error something else");
  }
});

router.get("/logout", function (req, res, next) {
  res.send("logout with a resource");
});

module.exports = router;
