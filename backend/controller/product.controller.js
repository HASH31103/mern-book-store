import mongoose from "mongoose";

import Product from "../models/product.model.js";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({}); // empty {} means fetch all data
    res.status(200).json({ success: true, data: products });
  } catch (e) {
    console.log("Error occured fetching product:", e.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // data provided by user

  if (!product.name || !product.price || !product.imageURL) {
    return res
      .status(400)
      .json({ success: false, message: "Provide all the fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (e) {
    console.log("Create error occured :", e.message);
    res.status(500).json({ success: false, message: "Server error occured" });
  }
};

export const delProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(201).json({ success: true, message: "Product Deleted" });
  } catch (e) {
    console.log("Delete error occured:", e.message);
    res.status(404).json({ success: false, message: "Product not found" });
  }
};

export const updateProduct = async (req, res) => {
  // put replaces whole document, patch updates required fields
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (e) {
    console.log("Update error occured:", e.message);
    req.status(500).json({ success: false, message: "Server error" });
  }
};
