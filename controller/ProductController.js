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
  Product.find({}, (err, items) => {
    if (err) {
    } else {
      console.log(items);
      res.render("products", { items: items });
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
// router.post(
//   "/createProduct",
//   upload.single("uploaded_file"),
//   async function (req, res, next) {
//     console.log(req.body);
//     let productDB = req.body;
//     if (req.file) {
//       const encoded = req.file.buffer.toString("base64");
//       console.log(encoded);
//     }
//     res.render("products");
//   }
// );

router.get("/listProduct", function (req, res, next) {
  res.send("listProduct with a resource");
});

router.get("/deleteProduct", function (req, res, next) {
  res.send("deleteProduct with a resource");
});

module.exports = router;
