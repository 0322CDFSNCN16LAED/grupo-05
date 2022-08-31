// const db = require("../models/Professionals")
// const allprofessionals = db.getAll()
const { User } = require("../database/models");
const { Category } = require("../database/models");
const { Service } = require("../database/models");
const db = require('../database/models');
const Op = db.Sequelize.Op;

// const dbServices = require("../models/Services")
// const allService = dbServices.getAll()
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
                {association: "user"},
                {association: "servicePhoto"}
            ]
        })
        .then(function(servicios){
            
            res.render("professionals", { servicios })
        })
    },
     shop:(req,res)=>{
        res.render("shop")
    },
    searchProfessionals: async (req, res) => {

         let servicios = await Service.findAll({
            where: {
                jobDescription: {[Op.like]:"%" +req.query.search+ "%"}
            },
            include: [
                {association: "category"},
                {association: "user"},
                {association: "servicePhoto"}
            ]
        })

        // Function para buscar por nombre: 

        /*const profesionalBuscado = await User.findAll({
            where: {
                fullName: {[Op.like]:"%" +req.query.search+ "%"}
            }
        })
         if(profesionalBuscado) {
            for (let i = 0; i < profesionalBuscado.length; i++) {
                const servicioBuscadoPorNombre = await Service.findAll({
                    where: {
                        userId: profesionalBuscado[i].id
                    },
                    include: [
                        {association: "category"},
                        {association: "user"},
                        {association: "servicePhoto"}
                    ]
                })
                servicios.push(servicioBuscadoPorNombre)
            }
        }*/

        res.render("professionals", { servicios })
    }
}

module.exports = controlador;