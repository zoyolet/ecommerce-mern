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
  try {
    let cartRequest = req.body;
    let cartDB = new Cart(cartRequest);
    await cartDB.save();
    res.redirect("/cart");
  } catch (e) {
    console.log(e);
    res.send("error something else");
  }
  res.render("createProduct");
});

router.get("/listCart", function (req, res, next) {
  res.send("listProduct with a resource");
});

router.get("/deleteCart", function (req, res, next) {
  res.send("deleteProduct with a resource");
});

module.exports = router;
