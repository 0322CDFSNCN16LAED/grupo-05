const { Category } = require("../../database/models")


module.exports = {
    list: async (req, res) => {
        const category = await Category.findAndCountAll({
            attributes: ["id", "name","categoryPhoto"]
        })
        const respuesta = {
            meta: {
                status: 200,
                url: "api/category"
            },
            data: category
        };
        res.json(respuesta)
    },

    
}