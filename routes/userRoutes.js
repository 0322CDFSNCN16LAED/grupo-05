const express = require("express");
const routes = express.Router();

const userController = require("../controllers/userController")


//perfil carrito y cosas de usuarios


// Middlewares 
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const uploadFile = require('../middlewares/multerMiddleware');
const serviceCreateValidation = require("../middlewares/serviceCreatValidationMiddleware")
const serviceModifyValidation = require("../middlewares/serviceModifyValidationMiddleware");


routes.get ("/account", authMiddleware, userController.account);
routes.get ("/modify-account/:id", authMiddleware, userController.modifyAccount);
routes.post ("/modify-account/:id", authMiddleware, uploadFile.single("imagen"), userController.processModifyAccount);
routes.get ("/add-service", authMiddleware, userController.addService);
routes.post("/add-service",  authMiddleware, uploadFile.array("imagen"),serviceCreateValidation, userController.storeService);
routes.get ("/my-service", authMiddleware, userController.myService);
routes.delete("/my-service/:id", authMiddleware, userController.deleteService);
routes.get("/modify-service/:id", authMiddleware, userController.modifyService)
routes.put("/modify-service/:id",serviceModifyValidation,authMiddleware, uploadFile.array("imagen"), userController.processModifyService);
routes.get("/service-detail/:id", authMiddleware, userController.serviceDetail)

routes.get("/service-pending", authMiddleware, userController.servicePending)

routes.post("/service-solicitation/:id", authMiddleware, userController.serviceSolicitation)
routes.get("/notifications", authMiddleware, userController.notifications)

// Profesional acepta el servicio
routes.post("/accept-service/:id", authMiddleware, userController.acceptService)
// Profesional rechaza servicio
routes.post("/reject-service/:id", authMiddleware, userController.rejectService)
// Profesional cambia la fecha
routes.post("/change-date/:id", authMiddleware, userController.changeDate)
// Profesional cancela la fecha previamente confirmada
routes.post("/cancel-service/:id", authMiddleware, userController.cancelService)



module.exports = routes;