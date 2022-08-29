const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  totalprice: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  status: {
    type: [
      {
        type: String,
        enum: ["active", "inactive"],
      },
    ],
    default: ["active"],
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
