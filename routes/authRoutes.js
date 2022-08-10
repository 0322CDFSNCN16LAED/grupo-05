//login logout register// user register

const express = require("express");
const routes = express.Router();
const authController = require("../controllers/authController")

// Middlewares 
const registerValidation = require('../middlewares/registerValidationMiddleware')
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const uploadFile = require('../middlewares/multerMiddleware');

routes.get ('/register', guestMiddleware,authController.register );
routes.post('/register', registerValidation, uploadFile, authController.processRegister);

// user Login
routes.get ('/login', guestMiddleware,authController.login);
routes.post ('/login', authController.processLogin);

// user Logout
routes.get ('/logout', authMiddleware, authController.logout);

module.exports = routes