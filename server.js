const express = require("express");
const Product = require("./models/ProductModel");
const app = express();

// connection mongodb
const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://hans:8Kn9fj3PqRjiJkZm@cluster0.clerm.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(3000, () => {
      console.log("node api app is running on port 3000");
    });
    console.log("Successfully connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });

// disetting supaya program bisa membaca inputan data dalam bentuk json
app.use(express.json());

// SETTING UNTUK REQUEST BY URL
app.use(express.urlencoded({ extended: false })); // set false supaya data yang dikirimkan oleh JS akan diparse dalam bentuk object

// untuk menentukan port yang akan digunakan
// app.listen(3000, () => {
//   console.log("node api app is running on port 3000");
// });

// ROUTES

// MACAM - MACAM ACTION
// 1. get
// 2. put
// 3. post
// 4. delete

// ROUTE SYNTAX

// <nama variable>.<action yang mau dilakuin> ('<path nya>', (req, res) => {
// command to execute
// } )

// req, res => callback function, terdiri dari 2 macam yaitu request user (req) dan response program ke user (res)
// u can see the result in browser accessing localhost:3000 atau sesuai dengan yang telah disetting
app.get("/", (req, res) => {
  res.send("Hello home page");
});

app.get("/api/get", (req, res) => {
  res.send("success called this path");
});

app.post("/product", async (req, res) => {
  try {
    console.log(req.body);
    const product = await Product.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});

// get all product data
app.get("/product/get", async (req, res) => {
  try {
    const products = await Product.find({}); // find({}) => means get all data. The {} means for the filter to get data
    console.log(products);
    res.status(200).json({
      status: "success",
      result: products.length,
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});

// get product by filter name
app.get("/product/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const product = await Product.find({ name });
    console.log(product);
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});

// update product data by id
app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findByIdAndUpdate(id, req.body);
    console.log(product);
    if (!product) {
      res.status(404).json({
        status: "failed",
        message: "product with id " + id + "not found",
        message: `Cannot find any product with id ${id}`,
      });
    }
    product = await Product.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});

// Delete a product
app.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({
        status: "failed",
        message: `Cannot find any product with id ${id}`,
      });
    }
    res.status(200).json({
      status: "success",
      message: `Data with id ${id} has been deleted`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});
