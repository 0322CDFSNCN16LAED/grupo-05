require("dotenv").config({path:"./.env"});

const express = require ("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const coockieParser = require("cookie-parser")
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
const apiRoutes = require("./routes/api/apiRoutes")
const cors = require("cors");

app.use(cors(["localhost:3000"]));
app.use(session({secret:"Secreto", resave:false, saveUninitialized:false,}));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(methodOverride("_method"));
app.use(coockieParser())
app.use(userLoggedMiddleware)
const PORT= process.env.PORT;
app.listen (PORT,()=>{
    console.log("Corriendo en servidor")
});

app.set("view engine","ejs");

// Routes
const mainRouters= require ("./routes/mainRoutes");

app.use("/", mainRouters);
app.use("/api", apiRoutes)


