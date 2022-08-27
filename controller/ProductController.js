var express = require("express");
const bcrypt = require("bcryptjs");
const Product = require("./../models/Products");
var router = express.Router();
const salt = 10;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/getProduct", function (req, res, next) {
  res.send("getProduct with a resource");
});

router.get("/createProduct", async function (req, res, next) {
  res.render("createProduct");
});

router.get("/listProduct", function (req, res, next) {
  res.send("listProduct with a resource");
});

router.get("/deleteProduct", function (req, res, next) {
  res.send("deleteProduct with a resource");
});

module.exports = router;
