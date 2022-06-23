const db = require("../models/Professionals")
const allprofessionals = db.getAll()

const dbServices = require("../models/Services")
const allService = dbServices.getAll()

const controlador = {
    index: (req,res) => {
        res.render ("index",{allService:allService})
    },
    professionals: (req,res) => {
    res.render ("professionals",{allprofessionals:allprofessionals})
    },
     shop:(req,res)=>{
        res.render("shop")
    },
}

module.exports = controlador;