const express = require("express");
const { route } = require("./userRoutes");
const routes = express.Router();

const userRoutes = require("./userRoutes")
const serviceRoutes = require("./serviceRoutes")
const mainRoutes = require("./mainRoutes")




routes.use("/user", userRoutes)

routes.use("/service", serviceRoutes)

routes.use("/category", mainRoutes)

module.exports = routes;