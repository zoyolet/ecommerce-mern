var express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const Product = require("./../models/Products");
const Order = require("./../models/Orders");
var router = express.Router();
const salt = 10;
const isAdmin = true;
/* GET users listing. */
router.get("/", function (req, res, next) {
  var isLoggedin = false;
  if (req.session.userToken) {
    isLoggedin = true;
  }
  res.render("admin", { isAdmin: isAdmin, isLoggedin: isLoggedin });
});

router.get("/users", function (req, res, next) {
  var isLoggedin = false;
  if (req.session.userToken) {
    isLoggedin = true;
  }
  User.find({}, (err, items) => {
    if (err) {
    } else {
      res.render("adminuser", {
        isAdmin: isAdmin,
        isLoggedin: isLoggedin,
        items: items,
      });
    }
  });
});

router.get("/products", function (req, res, next) {
  var isLoggedin = false;
  if (req.session.userToken) {
    isLoggedin = true;
  }
  Product.find({}, (err, items) => {
    if (err) {
    } else {
      res.render("adminproduct", {
        isAdmin: isAdmin,
        isLoggedin: isLoggedin,
        items: items,
      });
    }
  });
});
router.get("/orders", async function (req, res, next) {
  var isLoggedin = false;
  if (req.session.userToken) {
    isLoggedin = true;
  }
  Order.find({}, (err, items) => {
    if (err) {
    } else {
      console.log(items);
      res.render("adminorder", {
        title: "Amernon",
        items: items,
        isAdmin: isAdmin,
        isLoggedin: isLoggedin,
      });
    }
  }).populate({ path: "product", model: "Product" });
});
module.exports = router;
