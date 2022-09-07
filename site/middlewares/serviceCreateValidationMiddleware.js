const path = require('path');
const { body } = require('express-validator');

const serviceCreateValidation = [
    body("precio").notEmpty().withMessage("Tenes que aclarar un precio"),
    body("descripcion").notEmpty().withMessage("Tenes que escribir una descripcion").isLength({ min: 20 }).withMessage("Ingresa al menos 20 caracteres"),
    body("imagen").custom((value, {req})=>{
        let file = req.files
        for(let i = 0; i < file.length; i ++) {
            let  acceptedExtension = [".png", ".jpg", "jpeg", "gif"];
            let fileExtension = path.extname(file[i].originalname)
            if(!acceptedExtension.includes(fileExtension)){
            throw new Error ("Las extensiones permitidas son JPG,PNG,JPEG,GIF")
            }
            return true
        }
        return true
    })
]

module.exports = serviceCreateValidation