var express = require("express");
const bcrypt = require("bcryptjs");
const Product = require("./../models/Products");
const Order = require("./../models/Orders");
const Cart = require("./../models/Carts");
var jwt = require("jsonwebtoken");
const User = require("../models/Users");
const mongoose = require("mongoose");
var router = express.Router();
const salt = 10;
const secret = "veryverysecretkey";

/* GET users listing. */
router.get("/", async function (req, res, next) {
  var isLoggedin = false;
  if (req.session.userToken) {
    isLoggedin = true;
  }
  var decoded = jwt.decode(req.session.userToken);
  let user = await User.find({ username: decoded.username });
  let result = await Cart.find({ user: user._id }).populate({
    path: "product",
    model: "Product",
  });
  console.log(result);
  var total = 0;
  for (item in result) {
    total += result[item].product.price;
  }
  console.log(total);
  res.render("cart", { isLoggedin: isLoggedin, result: result, total: total });
});

router.get("/getCartByUser", function (req, res, next) {
  res.send("getProduct with a resource");
});

router.get("/createOrder", async function (req, res, next) {
  var isLoggedin = false;
  if (req.session.userToken) {
    isLoggedin = true;
  }
  var decoded = jwt.decode(req.session.userToken);
  let user = await User.find({ username: decoded.username });
  let result = await Cart.find({ user: user._id, status: "active" }).populate({
    path: "product",
    model: "Product",
  });
  // let result = await Cart.find({ user: user._id, status: "active" });
  //   for (index in result) {
  //     result[index].status = "inactive";
  //   }
  Cart.updateMany({ user: user._id }, { status: "inactive" });
  var total = 0;
  for (item in result) {
    total += result[item].product.price;
  }
  let order = new Order();
  order.totalprice = total;
  order.user = user._id;
  let products = [];
  for (item in result) {
    products.push(result[item].product._id);
  }
  order.product = products;
  await order.save();
  res.redirect("/order?orderId=" + order._id);
});

router.post("/addToCart", async function (req, res, next) {
  var isLoggedin = false;
  if (req.session.userToken) {
    isLoggedin = true;
  }
  if (isLoggedin) {
    console.log(req.body);
    console.log(req.session.userToken);
    var decoded = jwt.decode(req.session.userToken);
    let user = await User.find({ username: decoded.username });
    let cart = new Cart();
    cart.user = user._id;
    cart.product = req.body.id;
    cart.quantity = req.body.quantity;
    console.log(cart);
    const saveedcart = await cart.save();
    res.redirect("/cart/");
  } else {
    res.redirect("/users/login");
  }
  // res.send("listProduct with a resource");
});

router.get("/listCart", function (req, res, next) {
  res.send("listProduct with a resource");
});

router.get("/deleteCart", function (req, res, next) {
  res.send("deleteProduct with a resource");
});

module.exports = router;
