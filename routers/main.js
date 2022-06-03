const express = require("express");
const mainController = require('../controllers/mainController');

/*const userController = require('../controllers/userController')*/

let router = express.Router();

router.get('/', mainController.home);

router.get('/carrito-de-compras', mainController.carrito);

/*router.get('/user', userController)*/

module.exports = router;