const express = require("express");
const routes = express.Router();
const userController = require("../controllers/userController")
const registerValidation = require('../middlewares/registerValidationMiddleware')
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

// user controllers

// user register
routes.get ("/register", guestMiddleware,userController.register );
routes.post('/register', registerValidation, userController.processRegister);

// user Login
routes.get ("/login", guestMiddleware,userController.login);
routes.post ("/login", userController.processLogin);


routes.get ("/account", authMiddleware,userController.account);
routes.get ("/add-service", authMiddleware,userController.addService);
routes.post ("/add-service", userController.storeService);
routes.get ("/my-service", authMiddleware, userController.myService);

module.exports = routes;