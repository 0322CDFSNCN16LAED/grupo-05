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
    }
}