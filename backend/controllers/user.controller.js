import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json({ success: true, data: users });
	} catch (error) {
		console.error("Error fetching users:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createUser = async (req, res) => {
	const { name, email, password, phone, address } = req.body;

	// Validate input fields
	if (!name || !email || !password || !phone || !address) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	try {
		// Check if the email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ success: false, message: "Email already in use" });
		}

		// Create and save the new user
		const newUser = new User({ name, email, password, phone, address });
		await newUser.save();
		res.status(201).json({ success: true, data: newUser });
	} catch (error) {
		console.error("Error creating user:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateUser = async (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	// Validate user ID
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid User ID" });
	}

	try {
		// Prevent updating email or password directly via this route
		delete updates.email;
		delete updates.password;

		const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
		if (!updatedUser) {
			return res.status(404).json({ success: false, message: "User not found" });
		}
		res.status(200).json({ success: true, data: updatedUser });
	} catch (error) {
		console.error("Error updating user:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;

	// Validate user ID
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid User ID" });
	}

	try {
		const deletedUser = await User.findByIdAndDelete(id);
		if (!deletedUser) {
			return res.status(404).json({ success: false, message: "User not found" });
		}
		res.status(200).json({ success: true, message: "User deleted" });
	} catch (error) {
		console.error("Error deleting user:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
