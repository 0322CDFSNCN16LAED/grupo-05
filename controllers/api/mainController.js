const db = require("../../database/models")
const User = require("../../database/models/User")

module.exports = {
    list: (req , res)=>{
        db.User.findAndCountAll({
            attributes: ["id","email"]
        })
        .then(({rows, count}) =>{
            res.status(200).json({
                meta: {
                    status: 200,
                    url: req.originalUrl,
                    total: count,
                },
                data: rows, 
            })
        
        })
    }
}