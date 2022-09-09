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
                url: "api/service"
            },
            data: services
        };
        res.json(respuesta)
        },
        
    detail: async (req, res) => {
        const service = await Service.findByPk(req.params.id,{
            attributes: ["id", "jobDescription", "price"], 
            include:[
                {association: "category"},
                {association: "servicePhoto"}
            ]
        })

        const respuesta = await  {
            meta: {
                status: 200,
                url: req.originalUrl,
                url: '/api/service/:id'
            },
            data: service
        };
        res.json(respuesta);
    },
}