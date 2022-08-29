var express = require("express");
var router = express.Router();
var isLoggedin = false;

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req.session);
  if (req.session.userToken) {
    isLoggedin = true;
  }
  res.render("index", { title: "Amernon", isLoggedin: isLoggedin });
});

module.exports = router;
