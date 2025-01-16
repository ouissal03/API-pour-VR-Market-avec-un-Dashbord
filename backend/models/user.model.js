import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // For hashing passwords

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
        unique: true, // Ensures uniqueness
      },
      address: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields
    }
  );
  

// Pre-save middleware to hash passwords
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
