var express = require("express");
const bcrypt = require("bcryptjs");
const Product = require("./../models/Products");
var router = express.Router();
const salt = 10;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("order");
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
