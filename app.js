const express = require("express");
const path = require("path");
const app = express();

const rutasMain = require('./routers/main.js');

app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;

app.listen(PORT, () => {
  console.log("corriendo en el puerto " + PORT);
});

app.set('view engine', 'ejs');

app.use("/", rutasMain)
/*app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.ejs"));
});*/
app.get("/product-options", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/product-options.ejs"));
});
app.get("/product-detail", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/product-detail.ejs"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/register.ejs"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.ejs"));
});
app.get("/carrito", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/carrito.ejs"));
});
app.get("/worker-register", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/worker-register.ejs"));
});