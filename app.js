const express = require ("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

app.use(session({secret:"Secreto", resave:false, saveUninitialized:false,}));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(methodOverride("_method"));
app.use(userLoggedMiddleware)

const PORT= 3030;
app.listen (PORT,()=>{
    console.log("Corriendo en servidor")
});

app.set("view engine","ejs");

// Routes
const mainRouters= require ("./routes/mainRoutes");

app.use("/", mainRouters);

