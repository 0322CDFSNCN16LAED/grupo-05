const path = require('path');
const { body } = require('express-validator');

const registerValidation = [
    body('fullname').notEmpty().withMessage('Tenes que escribir tu nombre completo').isLength({ min: 2 }).withMessage('El Nombre debe contener al menos dos caracteres'),
    body('direccion').notEmpty().withMessage('Tenes que ingresar una Direccion'),
    body("piso").isInt(),
    body('email').notEmpty().withMessage('Tenes que escribir tu Email').bail()
    .isEmail().withMessage('Tenes que escribir un correo electronico valido'),
    body('phone').notEmpty().withMessage('Ecribi tu numero de telefono').bail()
    .isLength({min: 5},{max: 10}).withMessage('Escribi un numero de telefono valido'),
    body('password').notEmpty().withMessage('Escribi una contraseña').bail()
    .isLength({min: 8}).withMessage('La contraseña debe contener al menos ocho caracteres'),
    body("imagen").custom((value, {req})=>{
        let file = req.file;
        if (file) {
            let  acceptedExtension = [".png", ".jpg", "jpeg", "gif"];
            let fileExtension = path.extname(file.originalname)
            if(!acceptedExtension.includes(fileExtension)){
            throw new Error ("Las extensiones permitidas son JPG,PNG,JPEG,GIF")
        }
        return true
        }
        return true
    })
]

module.exports = registerValidation