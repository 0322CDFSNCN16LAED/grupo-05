const db = require("../data-base/db")
const allservices = db.getAll()

const dbProfessions = require("../data-base/db-professions")
const allprofessions = dbProfessions.getAll()

const controlador = {
    index: (req,res) => {
        res.render ("index",{allprofessions:allprofessions})
    },
    professionals: (req,res) => {
    res.render ("professionals",{allservices:allservices})
    },
     shop:(req,res)=>{
        res.render("shop")
    },
}

module.exports = controlador;