const path = require('path');
const { body } = require('express-validator');

const profRegisterValidation = [
    body('nombre').notEmpty().withMessage('Tenes que escribir tu nombre'),
    body('apellido').notEmpty().withMessage('Tenes que escribir tu apellido'),
    body('email').notEmpty().withMessage('Tenes que escribir tu Email').bail()
    .isEmail().withMessage('Tenes que escribir un correo electronico valido'),
    body('telefono').notEmpty().withMessage('Ecribi tu numero de telefono').bail()
    .isLength({min: 5},{max: 10}).withMessage('Escribi un numero de telefono valido'),
    body('password').notEmpty().withMessage('Escribi una contraseña').bail()
    .isLength({min: 8}).withMessage('La contraseña debe contener al menos ocho caracteres')
    //falta de localidad y barrio y terminos y condiciones
]

module.exports = profRegisterValidation