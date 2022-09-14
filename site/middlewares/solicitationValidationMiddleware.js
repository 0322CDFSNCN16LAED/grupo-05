const path = require('path');
const { body } = require('express-validator');


const solicitationValidation = [
    body("date").notEmpty().withMessage("Tenes que aclarar un dia"),
    body("time").notEmpty().withMessage("Tenes que escribir un horario")
]

module.exports = solicitationValidation