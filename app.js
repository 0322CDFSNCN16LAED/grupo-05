const express = require("express");
const path = require("path");
const app = express();

const rutasMain = require('./routers/main.js');
const rutasUser = require('./routers/user.js');
const rutasProduct = require('./routers/product.js');

app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;

app.listen(PORT, () => {
  console.log("corriendo en el puerto " + PORT);
});

app.set('view engine', 'ejs');

app.use("/", rutasMain);
app.use("/user", rutasUser);
app.use("/product", rutasProduct);




