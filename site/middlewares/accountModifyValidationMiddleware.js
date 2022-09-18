const path = require('path');
const { body } = require('express-validator');

const registerValidation = [
    body('fullname').notEmpty().withMessage('Tenes que escribir tu nombre completo').isLength({ min: 2 }).withMessage('El Nombre debe contener al menos dos caracteres'),
    body('direccion').notEmpty().withMessage('Tenes que ingresar una Direccion'),
    body('phone').notEmpty().withMessage('Ecribi tu numero de telefono').bail()
    .isLength({min: 5},{max: 10}).withMessage('Escribi un numero de telefono valido'),
    body("localidad").custom((value, {req}) => {
        if(req.body.localidad == "Seleccione una opcion") {
            throw new Error ("Tenes que elegir una provicnia")
        }
        return true
    }),
    body("barrio").custom((value, {req}) => {
        if(req.body.barrio == "Seleccione una opcion") {
            throw new Error ("Tenes que elegir una localidad")
        }
        return true
    }),
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