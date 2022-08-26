var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/login", function (req, res, next) {
  res.send("login with a resource");
});

router.post("/signup", function (req, res, next) {
  res.send("signup with a resource");
});

router.get("/logout", function (req, res, next) {
  res.send("logout with a resource");
});

module.exports = router;
