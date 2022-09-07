const express = require("express");
const routes = express.Router();
const serviceController = require("../../controllers/api/serviceController")


routes.get("/", serviceController.list)
routes.get("/:id", serviceController.detail)


module.exports = routes;