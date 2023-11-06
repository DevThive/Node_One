const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  Product_Name: {
    type: String,
    required: true,
    unique: true,
  },
  Product: {
    type: String,
  },
  User_Name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  State: {
    type: String,
    default: "FOR_SALE",
  },
  Password: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Products", ProductSchema);
