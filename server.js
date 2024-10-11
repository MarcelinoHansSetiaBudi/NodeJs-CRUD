const express = require("express");
const app = express();

// untuk menentukan port yang akan digunakan
app.listen(3000, () => {
  console.log("node api app is running on port 3000");
});

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
  res.send("Hello World");
});

app.get("/api/get", (req, res) => {
  res.send("success called this path");
});
