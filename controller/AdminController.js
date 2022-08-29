var express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const Product = require("./../models/Products");
const Order = require("./../models/Orders");
const mongoose = require("mongoose");
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
  console.log(req.query);
  if (req.query.orderId && req.query.orderStatus) {
    console.log("req.query.orderId okay");
    let orderId = mongoose.Types.ObjectId(req.query.orderId);
    let orderStatus = req.query.orderStatus;
    await Order.findByIdAndUpdate(
      { orderId },
      { staus: orderStatus },
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated Order" + res);
        }
      }
    );
  }
  console.log("just pass");
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
