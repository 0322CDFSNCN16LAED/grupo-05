const express = require("express");
const routes = express.Router();

const authRoutes = require("./authRoutes")
const mainRoutes = require("./mainRoutes")
const userRoutes = require("./userRoutes")


routes.use("/auth",authRoutes)
routes.use("/user", userRoutes)

module.exports = routes;