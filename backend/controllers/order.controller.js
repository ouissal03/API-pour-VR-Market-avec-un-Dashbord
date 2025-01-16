import mongoose from "mongoose";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Validate userId and convert it to ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    // Fetch the user using the validated userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Enrich products with product data and update stock
    const enrichedProducts = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findOne({ name: item.name });
        if (!product) {
          throw new Error(`Product with name ${item.name} not found`);
        }
        if (item.quantity > product.stockQuantity) {
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }

        product.stockQuantity -= item.quantity;
        await product.save();

        return {
          productId: product._id,
          name: product.name,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    const totalAmount = enrichedProducts.reduce((sum, product) => {
      return sum + product.quantity * product.price;
    }, 0);

    const newOrder = new Order({
      user: user._id,  // Store the reference to the user
      products: enrichedProducts,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    // Populate the 'user' field with relevant details (name, email, phone, address)
    const orders = await Order.find().populate('user', 'name email phone address'); 

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone address');  

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};
