var express = require("express");
const bcrypt = require("bcryptjs");
const Product = require("./../models/Products");
var router = express.Router();
const salt = 10;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("cart");
});

router.get("/getCartByUser", function (req, res, next) {
  res.send("getProduct with a resource");
});

router.get("/createCart", async function (req, res, next) {
  res.render("createProduct");
});

router.get("/listCart", function (req, res, next) {
  res.send("listProduct with a resource");
});

router.get("/deleteCart", function (req, res, next) {
  res.send("deleteProduct with a resource");
});

module.exports = router;
