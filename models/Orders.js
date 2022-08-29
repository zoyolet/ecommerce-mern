const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  totalprice: {
    type: Number,
    required: true,
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  status: {
    type: [
      {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
      },
    ],
    default: ["Pending"],
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
