const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "This Product name is already taken"],
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
