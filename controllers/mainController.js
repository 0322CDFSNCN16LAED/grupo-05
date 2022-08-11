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
        if(req.params.id){
            const filteredProfessionals = db.getFilteredProfessionals(req.params.id)
            res.render ("professionals", {allprofessionals:filteredProfessionals, profesion: req.params.id})
        }else{
            const allprofessionals = db.getAll()
            res.render ("professionals", {allprofessionals:allprofessionals})
        }
    },
     shop:(req,res)=>{
        res.render("shop")
    },
   
}

module.exports = controlador;