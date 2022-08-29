var express = require("express");
const Product = require("./../models/Products");
const multer = require("multer");
var router = express.Router();
const fs = require("fs");
var path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const salt = 10;
// Step 5 - set up multer for storing upl

/* GET users listing. */
router.get("/", function (req, res, next) {
  var isLoggedin = false;
  if (req.session.userToken) {
    isLoggedin = true;
  }
  Product.find({}, (err, items) => {
    if (err) {
    } else {
      //   console.log(items);
      res.render("products", { items: items, isLoggedin: isLoggedin });
    }
  });
});

router.get("/getProduct", function (req, res, next) {
  Product.find({}, (err, items) => {
    if (err) {
    } else {
      console.log(items);
      res.send(items);
    }
  });
});
router.post("/createProduct", upload.single("image"), (req, res, next) => {
  console.log(req.file);
  var obj = {
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    quantity: req.body.quantity,
    brand: req.body.brand,
    img: {
      data: req.file.buffer.toString("base64"),
      contentType: "image/png",
    },
  };
  Product.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
      res.redirect("/product");
    }
  });
});

module.exports = router;
