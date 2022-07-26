const express = require("express");
const routes = express.Router();
const userRoutes = require("./userRoutes"); 

const mainController =  require ("../controllers2/mainController");
 

// main controllers
routes.get ("/", mainController.index);
routes.get ("/shop", mainController.shop);

// User Route
routes.use('/user', userRoutes);

routes.get ("/professionals/:id?", mainController.professionals);


module.exports = routes;