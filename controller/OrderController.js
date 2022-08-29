var express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Product = require("./../models/Products");
const User = require("../models/Users");
const Order = require("./../models/Orders");
var router = express.Router();
const salt = 10;
/* GET users listing. */
router.get("/", async function (req, res, next) {
  var isLoggedin = false;
  if (req.session.userToken) {
    isLoggedin = true;
  }

  const orderId = req.query.orderId;
  var decoded = jwt.decode(req.session.userToken);
  let user = await User.find({ username: decoded.username });
  let data = await Order.find({ user: user._id }).populate({
    path: "product",
    model: "Product",
  });
  console.log(data);
  res.render("order", { data: data });
});

router.get("/getOrder", function (req, res, next) {
  res.send("getOrder with a resource");
});

router.get("/createOrder", async function (req, res, next) {
  res.render("createOrder");
});

router.get("/listOrder", function (req, res, next) {
  res.send("listOrder with a resource");
});

router.get("/deleteOrder", function (req, res, next) {
  res.send("deleteOrder with a resource");
});

module.exports = router;
