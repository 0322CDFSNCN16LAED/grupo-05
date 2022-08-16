const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const { User } = require("../database/models");
const { Category } = require("../database/models");
const { Service } = require("../database/models");


const dbProfessionals = require("../models/Professionals");
const allProfessionals = dbProfessionals.getAll()


const controlador = {
   
    account: (req,res) => {
        res.render ("account")
    },
    addService: (req,res) => {
        Category.findAll()
        .then(function(result) {
            console.log(result[0].name)
            res.render("add-service", { categorias : result })})
    },
    storeService: (req,res) => {
        const newService = req.body;
        Service.create ({
            categoryId: newService.profesion,
            jobDescription: newService.descripcion,
            price: newService.precio,
            userId: req.session.userLogged.id
            /* if(req.file){
                photo = req.file.filename;       
            } */
        })
        res.redirect("/user/my-service");
    },
    myService: async (req,res) => {
       const services = await Service.findAll({
            where: {
                userId: req.session.userLogged.id
            },
            include: [
                {association: "category"}
            ]
        })
        console.log(services)
        res.render ("my-service", { services })
    },
     deleteService:(req,res)=>{
        Service.destroy({
            where: {
                id: req.params.id
            }
        })
    //    const allprofessionals = dbProfessionals.getAll();
    //    console.log(allprofessionals)
    //    const filteredList = allprofessionals.filter((service)=>{
    //         return service.id != req.params.id;
    //    }) 
    //    dbProfessionals.saveAll(filteredList);
      
     res.redirect("/user/my-service");
    },
    modifyService:(req,res)=>{
        let pedidoService = db.Service.findByPk(req.params.id)
        let pedidoCategory = db.Category.findAll();
        Promise.all([pedidoService,pedidoCategory])
        .then(function([servicio,categoria]){
            res.render("modify-service",{servicio,categoria})
        })
        // let id = req.params.id;
        // res.render("modify-service", {serviceId : req.params.id})
    }, 
    serviceDetail: (req,res)=>{
        // const product = dbProfessionals.getOne(req.params.id);
        // res.render("service-detail",{product})
        // // res.render("service-detail",{product:product})

    },
    processModifyService:(req,res)=>{
        Service.update ({
            categoryId: req.body.profesion,
            jobDescription: req.body.descripcion,
            price: req.body.precio,
            userId: req.session.userLogged.id
        },{
            where: {
                id: req.params.id,
            }
        })
        res.redirect("/user/my-service");

        // const services = allProfessionals
        // const serviceIndex = services.findIndex((s)=> {s.id == req.params.id});
        // let service = services[serviceIndex];

        // service.profesion = req.body.profesion; 
        // service.precio = req.body.precio;
        // service.descripcion = req.body.descripcion;

        // dbProfessionals.saveAll(services)
    
        res.redirect('/user/my-service')

    },
    logout: (req, res) => {
		req.session.destroy();
		return res.redirect('/');
    }
}

module.exports = controlador;