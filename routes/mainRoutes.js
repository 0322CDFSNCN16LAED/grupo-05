const express = require("express");
const routes = express.Router();
const userRoutes = require("./userRoutes"); 

const mainController =  require ("../controllers/mainController");
 

// main controllers
routes.get ("/", mainController.index);
routes.get ("/professionals", mainController.professionals);
routes.get ("/shop", mainController.shop);

// User Route
routes.use('/user', userRoutes);


module.exports = routes;