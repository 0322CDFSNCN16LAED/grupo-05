const express = require("express");
const routes = express.Router();
const userController = require("../../controllers/api/userController")

routes.get("/", userController.list)
routes.get("/:id", userController.detail)


module.exports = routes;