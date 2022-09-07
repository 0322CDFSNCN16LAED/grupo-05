const { Service } = require("../../database/models")



module.exports = {
    list: async (req, res) => {
        const services = await Service.findAndCountAll({
            attributes: ["id", "jobDescription", "price"],
            include: [
                {association: "category"}
            ]
        })
        const respuesta = {
            meta: {
                status: 200,
                url: "api/user"
            },
            data: services
        };
        res.json(respuesta)
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