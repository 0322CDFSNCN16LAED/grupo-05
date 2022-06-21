const express = require ("express");
const path = require("path");
const app = express();
// const methodOverride = require("method-override");

const mainRouters= require ("./routes/mainRoutes");
app.use("/", mainRouters);




app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
// app.use(methodOverride("_method"));

const PORT= 3030;
app.listen (PORT,()=>{
    console.log("Corriendo en servidor")
});

app.set("view engine","ejs");

