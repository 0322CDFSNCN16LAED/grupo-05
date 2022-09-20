const path = require('path');
const { body } = require('express-validator');

const reviewValidationMiddleware = [
    body("satisfactionReview").notEmpty().withMessage("Tenes que aclarar un nivel de satisfaccion"),
    body("commentReview").notEmpty().withMessage("Tenes que escribir un comentario").isLength({ min: 20 }).withMessage("Ingresa al menos 20 caracteres")
]

module.exports = reviewValidationMiddleware