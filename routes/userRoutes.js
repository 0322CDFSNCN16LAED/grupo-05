const express = require("express");
const routes = express.Router();
const userController = require("../controllers/userController")
const registerValidation = require('../middlewares/registerValidationMiddleware')

// user controllers

// user register
routes.get ("/register", userController.register );
routes.post('/register', registerValidation, userController.processRegister);

routes.get ("/register-professional",userController.registerProfessionals );
routes.post ("/register-professional",userController.processRegisterProfessionals );

routes.get ("/login", userController.login);
routes.get ("/account", userController.account);
routes.get ("/add-service", userController.addService);
routes.post ("/add-service", userController.storeService);
routes.get ("/my-service", userController.myService);

module.exports = routes;