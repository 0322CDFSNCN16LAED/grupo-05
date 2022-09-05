const express = require("express");
const routes = express.Router();
const userController = require("../../controllers/api/userController")

routes.get("/users", userController.list)


module.exports = routes;