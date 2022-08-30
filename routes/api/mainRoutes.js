const express = require("express");
const routes = express.Router();
const mainController = require("../../controllers/api/mainController")

routes.get("/home",mainController.list)


module.exports = routes;