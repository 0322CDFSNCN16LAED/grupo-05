const path = require('path');
const { body } = require('express-validator');

const registerValidation = [
    body('fullname').notEmpty().withMessage('Tenes que escribir tu nombre completo'),
    body('email').notEmpty().withMessage('Tenes que escribir tu Email').bail()
    .isEmail().withMessage('Tenes que escribir un correo electronico valido'),
    body('phone').notEmpty().withMessage('Ecribi tu numero de telefono').bail()
    .isLength({min: 5},{max: 10}).withMessage('Escribi un numero de telefono valido'),
    body('password').notEmpty().withMessage('Escribi una contraseña').bail()
    .isLength({min: 8}).withMessage('La contraseña debe contener al menos ocho caracteres')
]

module.exports = registerValidation