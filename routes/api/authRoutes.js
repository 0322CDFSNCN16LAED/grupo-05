const express = require("express");
const routes = express.Router();
const authController = require("../../controllers/api/authController")

routes.get("/email-validation", authController.list)


module.exports = routes;