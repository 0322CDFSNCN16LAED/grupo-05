const { Category } = require("../../database/models")


module.exports = {
    list: async (req, res) => {
        const categories = await Category.findAndCountAll({
            include:[{association: "service"}]
        });
        const respuesta = {
            meta: {
                status: 200,
                url: "api/category",
            },
            data: categories
        };
        res.json(respuesta)
        },

    
        
}