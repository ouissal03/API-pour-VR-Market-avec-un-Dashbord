import mongoose from "mongoose";

// Order schema with reference to the User model
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  products: [{
    productId: String,
    name: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: {
    type: String,
    default: 'Pending'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
