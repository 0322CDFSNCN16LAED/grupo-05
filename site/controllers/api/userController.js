const db = require("../../database/models")


module.exports = {
    list: (req, res) => {
        db.User.findAndCountAll({
            attributes: ["id","fullname","email",]
        })
            .then(({ rows, count }) => {
                res.status(200).json({
                    meta: {
                        status: 200,
                        url: req.originalUrl,
                        total: count,
                    },
                    data: rows,
                    })
            })
        },
        
    detail: (req, res) => {
        db.User.findByPk(req.params.id,{
            attributes: ["id", "fullname", "profilePicture", "email", "phoneNumber"]
        })
            .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: req.originalUrl,
                        url: '/api/user/:id'
                    },
                    data: user
                }
                res.json(respuesta);
            });
    },
}