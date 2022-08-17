const express = require("express");
const routes = express.Router();

const userController = require("../controllers/userController")


//perfil carrito y cosas de usuarios


// Middlewares 
const registerValidation = require('../middlewares/registerValidationMiddleware')
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const uploadFile = require('../middlewares/multerMiddleware');


routes.get ("/account", authMiddleware, userController.account);
routes.get ("/add-service", authMiddleware, userController.addService);
routes.post ("/add-service", uploadFile.array("imagen"), userController.storeService);
routes.get ("/my-service", authMiddleware, userController.myService);
routes.delete("/my-service/:id", userController.deleteService);
routes.get("/modify-service/:id", authMiddleware, userController.modifyService)
routes.put("/modify-service/:id", uploadFile.single("imagen"), userController.processModifyService);
routes.get("/service-detail/:id",userController.serviceDetail)



module.exports = routes;