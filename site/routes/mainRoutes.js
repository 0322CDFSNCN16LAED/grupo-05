const express = require("express");
const routes = express.Router();
const userRoutes = require("./userRoutes"); 
const mainController =  require ("../controllers/mainController");
const authRoutes = require("./authRoutes")
 

// main controllers
routes.get ("/", mainController.index);
routes.get ("/shop", mainController.shop);
routes.post("/add-to-cart/:id", mainController.shopService)

routes.get ("/professionals", mainController.searchProfessionals);

routes.get ("/:id?", mainController.professionals);


// User Route
routes.use('/user', userRoutes);
routes.use('/auth', authRoutes);


module.exports = routes;
