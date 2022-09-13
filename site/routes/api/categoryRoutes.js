const express = require("express");
const { route } = require("./userRoutes");
const routes = express.Router();

const categoryController = require("../../controllers/api/categoryController");

routes.get("/", categoryController.list)

module.exports = routes;