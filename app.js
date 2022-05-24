const express = require("express");

const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;

app.listen(PORT, () => {
  console.log("corriendo en el puerto " + PORT);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/carrito.html"));
});

app.get("/product-options", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/product-options.html"));
});

app.get("/product-detail", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/product-detail.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/register.html"));
});


app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});