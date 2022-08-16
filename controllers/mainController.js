// const db = require("../models/Professionals")
// const allprofessionals = db.getAll()
const { User } = require("../database/models");
const { Category } = require("../database/models");
const { Service } = require("../database/models");

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
        Service.findAll({
            where: {
                categoryId: req.params.id
            },
            include: [
                {association: "category"},
                {association: "user"}
            ]
        })
        .then(function(servicios){
            res.render("professionals", {servicios})
        })
    },
     shop:(req,res)=>{
        res.render("shop")
    },
   
}

module.exports = controlador;