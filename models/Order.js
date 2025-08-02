const mongoose = require("mongoose");

// Define the order schema
const orderSchema = new mongoose.Schema({
  username: String,
  paymentId: String,
  orderId: String,
  signature: String,
  totalAmount: Number,  // Store the total amount in rupees
  cartItems: Array,     // Store the items in the cart
  status: {
    type: String,
    default: "Pending",  // Default order status is 'Pending'
  },
  date: Date,            // Store the order creation date
}, { timestamps: true });  // Add timestamps (createdAt, updatedAt)

// Create and export the model based on the schema
module.exports = mongoose.model("Order", orderSchema);
