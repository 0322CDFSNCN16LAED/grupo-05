const express = require("express");
const routes = express.Router();
const userController = require("../controllers/userController")
const registerValidation = require('../middlewares/registerValidationMiddleware')
const professionalRegisterValidation = require('../middlewares/professionalRegisterValidationMiddleware')

// user controllers

// user register
routes.get ("/register", userController.register );
routes.post('/register', registerValidation, userController.processRegister);

// user Login
routes.get ("/login", userController.login);
routes.post ("/login", userController.processLogin);

routes.get ("/register-professional",userController.registerProfessionals );
routes.post ("/register-professional", professionalRegisterValidation,userController.processRegisterProfessionals );


routes.get ("/account", userController.account);
routes.get ("/add-service", userController.addService);
routes.post ("/add-service", userController.storeService);
routes.get ("/my-service", userController.myService);

module.exports = routes;