const express = require("express");
const routes = express.Router();

const userController = require("../controllers/userController")


//perfil carrito y cosas de usuarios


// Middlewares 
const registerValidation = require('../middlewares/registerValidationMiddleware')
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const uploadFile = require('../middlewares/multerMiddleware');

// user controllers

// user register
routes.get ('/register', guestMiddleware,userController.register );
routes.post('/register', registerValidation, userController.processRegister);

// user Login
routes.get ('/login', guestMiddleware,userController.login);
routes.post ('/login', userController.processLogin);

// user Logout
routes.get ('/logout', authMiddleware, userController.logout);


routes.get ("/account", authMiddleware,userController.account);
routes.get ("/add-service", authMiddleware, userController.addService);
routes.post ("/add-service", uploadFile.single("imagen"), userController.storeService);
routes.get ("/my-service", authMiddleware, userController.myService);
routes.delete("/my-service/:id", userController.deleteService);
routes.get("/modify-service/:id", authMiddleware, userController.modifyService)
routes.put("/modify-service/:id", uploadFile.single("imagen"), userController.processModifyService);



module.exports = routes;