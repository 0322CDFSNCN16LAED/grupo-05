const { body } = require('express-validator');

const serviceCreateValidation = [
    body('descripcion').notEmpty().withMessage('Tenes que escribir una descripcion').isLength({ min: 20 }).withMessage('Ingresa al menos 20 caracteres'),
   
]

module.exports = serviceCreateValidation