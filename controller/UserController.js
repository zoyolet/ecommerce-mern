var express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./../models/Users");
var jwt = require("jsonwebtoken");
var router = express.Router();
const salt = 10;
const secret = "veryverysecretkey";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login", async function (req, res, next) {
  try {
    let body = req.body;
    console.log(body);
    let username = req.body.username;
    let password = req.body.password;
    let session = req.session;
    let data = await User.find({ username: username });
    if (data) {
      console.log(data);
      let check = await bcrypt.compare(password, data[0].password);
      if (check) {
        res.cookie(`email`, `${data[0].email}`);
        res.cookie(`username`, `${data[0].username}`);
        var token = jwt.sign({ username: username }, secret);
        session.userToken = token;
        session.isLoggedIn = true;
        if (data[0].roles == "user") {
          res.redirect("/");
        } else if (data[0].roles == "admin") {
          res.redirect("/admin");
        }
      } else {
        res.send("Invalid username or password");
      }
    } else {
      res.send("something else");
    }
  } catch (e) {
    console.log(e);
  }
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
    let userDB = new User(user);
    await userDB.save();
    res.redirect("/users/login");
    // res.send("Registered successfully");
  } catch (e) {
    console.log(e);
    res.send("error something else");
  }
});

router.get("/logout", function (req, res, next) {
  req.session.destroy(null);
  res.clearCookie("username");
  res.clearCookie("email");
  res.clearCookie("jwttoken");
  res.redirect("/users/login");
});

module.exports = router;
