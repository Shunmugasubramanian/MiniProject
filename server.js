const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const Razorpay = require('razorpay');
const orderRoutes = require('./routes/order');
const adminRoutes = require('./routes/admin');
require('dotenv').config({ path: 'safe.env'});


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/", orderRoutes);
app.use("/", adminRoutes);
app.use("/", authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// Create Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order route
app.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  console.log("Received amount from client:", amount);

  if (amount && amount > 0) {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: 'order_rcptid_' + Date.now(),
    };

    try {
      const order = await razorpay.orders.create(options);
      console.log("Amount sent to Razorpay: ", order.amount);
      res.status(200).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid amount" });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
