const express = require("express");
const { route } = require("./userRoutes");
const routes = express.Router();

const userRoutes = require("./userRoutes")
const serviceRoutes = require("./serviceRoutes")




routes.use("/user", userRoutes)

routes.use("/service", serviceRoutes)

module.exports = routes;