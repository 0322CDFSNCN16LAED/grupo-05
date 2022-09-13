const { User } = require("../../database/models")


module.exports = {
    list: async (req, res) => {
        const users = await User.findAndCountAll({
            attributes: ["id", "fullName", "email"]
        })
        const respuesta = {
            meta: {
                status: 200,
                url: "api/user",
            },
            data: users
        };
        res.json(respuesta)
        },
        
    detail: (req, res) => {
        User.findByPk(req.params.id,{
            attributes: ["id", "fullName", "profilePicture", "email", "phoneNumber"]
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