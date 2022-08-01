const express = require("express");
const routes = express.Router();
const userRoutes = require("./userRoutes"); 
const mainController =  require ("../controllers2/mainController");
const authRoutes = require("./authRoutes")
 

// main controllers
routes.get ("/", mainController.index);
routes.get ("/shop", mainController.shop);

routes.get ("/:id?", mainController.professionals);

// User Route
routes.use('/user', userRoutes);
routes.use('/auth', authRoutes);


module.exports = routes;