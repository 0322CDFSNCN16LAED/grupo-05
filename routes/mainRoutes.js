const express = require("express");
const routes = express.Router();


const mainController =  require ("../controllers/mainController");
const userController = require("../controllers/userController") 

// main controllers
routes.get ("/", mainController.index);
routes.get ("/professionals", mainController.professionals);
routes.get ("/shop", mainController.shop);

// user controllers
routes.get ("/register",userController.register );
routes.get ("/register-professional",userController.registerProfessionals );
routes.get ("/login", userController.login);
routes.get ("/account", userController.account);
routes.get ("/add-service", userController.addService);
routes.post ("/add-service", userController.storeService);
routes.get ("/my-service", userController.myService);

module.exports = routes;