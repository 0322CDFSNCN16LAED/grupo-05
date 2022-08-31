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

       let profesionales = await User.findAll({
           where: {
               fullName: {[Op.like]:"%" +req.query.search+ "%"}
           }, 
           include: [
               {association: "services"}
           ]
       })

       let serviciosBuscadoPorProfesional = [];
       for(let i = 0; i < profesionales.length; i ++) {
           for(let j = 0; j < profesionales[i].services.length; j ++) {
               let servicio = await Service.findOne({
                   where: {
                       id: profesionales[i].services[j].id
                   },
                   include: [
                       {association: "category"},
                       {association: "user"},
                       {association: "servicePhoto"}
                   ]
               })
               serviciosBuscadoPorProfesional.push(servicio)
           }
       }

       res.render("professionals", { servicios, serviciosBuscadoPorProfesional })
   }
}

module.exports = controlador;