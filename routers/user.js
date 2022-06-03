const express = require("express");
const userController = require('../controllers/userController')

let router = express.Router();

router.get('/login', userController.login);

router.get('/register', userController.register);

router.get('/worker-register', userController.workerRegister);

module.exports = router;