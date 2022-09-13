const express = require("express");
const { route } = require("./userRoutes");
const routes = express.Router();

const userRoutes = require("./userRoutes")
const serviceRoutes = require("./serviceRoutes")
const categoryRoutes = require("./categoryRoutes")




routes.use("/user", userRoutes)

routes.use("/service", serviceRoutes)

routes.use("/category", categoryRoutes)

module.exports = routes;