const express = require("express");
const adminRouter = express.Router();
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const { Product } = require("../models/product");
const Order = require("../models/order");
const { PromiseProvider } = require("mongoose");


// Add product
adminRouter.post("/admin/add-product", admin, async (req, res) => {
    try {
      const { name, provider,description, image, quantity, price } = req.body;
      let product = new Product({
        name,
        provider,
        description,
        image,
        quantity,
        price,
      });
      product = await product.save();
      res.json(product);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  adminRouter.post("/admin/edit-product", admin, async (req, res) => {
    try {
      const { id, name, provider,description, image, quantity, price } = req.body;
      console.log(req.body)
      let product = await Product.findById(id);
      console.log(product)
      
      product.name = name;
      product.provider = provider;
      product.description = description;
      product.image = image;
      product.quantity = quantity;
      product.price = price;
      product = await product.save();
     
      res.json(product);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // Get all your products
adminRouter.get("/admin/get-products/:name", admin, async (req, res) => {
  try {
    const products = await Product.find({
      provider: { $regex: req.params.name, $options: "i" }
    });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


adminRouter.get("/admin/get-productss/", auth, async (req, res) => {
  try {
    const products = await Product.find({
    });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

  module.exports = adminRouter;