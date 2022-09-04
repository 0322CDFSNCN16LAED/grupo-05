const { body } = require('express-validator');

const serviceCreateValidation = [
    body('descripcion').notEmpty().withMessage('Tenes que escribir una descripcion').isLength({ min: 20 }).withMessage('Ingresa al menos 20 caracteres'),
    body("imagen").custom((value, { req }) => {
        var file = req.files.imagen;

        const acceptedExtensions = [".gif", ".png", ".jpeg", ".jpg"];
        const fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(
                    `Las extensiones de archivo permitidas son: ${acceptedExtensions.join(
                        ", "
                    )}`
                );
            }
            return true;
    }),
]

module.exports = serviceCreateValidation