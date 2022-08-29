var express = require("express");
const Product = require("./../models/Products");
var router = express.Router();
var isLoggedin = false;

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req.session);
  if (req.session.userToken) {
    isLoggedin = true;
  }
  Product.find({}, (err, items) => {
    if (err) {
    } else {
      //   console.log(items);
      res.render("index", {
        title: "Amernon",
        items: items,
        isLoggedin: isLoggedin,
      });
    }
  });
});

module.exports = router;
