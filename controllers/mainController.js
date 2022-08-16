// const db = require("../models/Professionals")
// const allprofessionals = db.getAll()

// const dbServices = require("../models/Services")
// const allService = dbServices.getAll()
const db = require("../database/models");
const controlador = {
    
    index: (req,res) => {
        db.Category.findAll()
        .then(function(categoria){
            return res.render("index",{categoria})
        })
        // res.render ("index",{allService:allService})
    },
    professionals: (req,res) => {
        db.Service.findAll({
            include: [
                {association: "category"},{association:"user"}
            ]
        })
        .then(function(servicios){
            res.render("professionals",{servicios})
        })
    },
     shop:(req,res)=>{
        res.render("shop")
    },
   
}

module.exports = controlador;