const express = require("express");
const routes = express.Router();
const path = require("path");
const userController = require("../controllers/userController")
const registerValidation = require('../middlewares/registerValidationMiddleware')
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const multer =require("multer");

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        const folder = path.join(__dirname,"../public/images/avatars")
        cb(null,folder);
    },
    filename:(req,file,cb) =>{
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName)
    }
})
const uploadFile = multer ({storage:storage})
// user controllers

// user register
routes.get ("/register", guestMiddleware,userController.register );
routes.post('/register', registerValidation, userController.processRegister);

// user Login
routes.get ("/login", guestMiddleware,userController.login);
routes.post ("/login", userController.processLogin);


routes.get ("/account", authMiddleware,userController.account);
routes.get ("/add-service", authMiddleware,userController.addService);
routes.post ("/add-service",uploadFile.single("imagen"), userController.storeService);
routes.get ("/my-service", authMiddleware, userController.myService);

module.exports = routes;