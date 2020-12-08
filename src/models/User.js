const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      min: 2,
    },
    last_name: {
      type: String,
      required: true,
      min: 2,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    isActive: Boolean,
    uuidToken: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);