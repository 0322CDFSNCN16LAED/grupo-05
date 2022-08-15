const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
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
        res.redirect("/")
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
       const allprofessionals = dbProfessionals.getAll();
       console.log(allprofessionals)
       const filteredList = allprofessionals.filter((service)=>{
            return service.id != req.params.id;
       }) 
       dbProfessionals.saveAll(filteredList);
      
       res.redirect("/user/my-service");
    },
    modifyService:(req,res)=>{
        let id = req.params.id;
        res.render("modify-service", {serviceId : req.params.id})
    }, 
    serviceDetail: (req,res)=>{
        const product = dbProfessionals.getOne(req.params.id);
        res.render("service-detail",{product})
        // res.render("service-detail",{product:product})

    },
    processModifyService:(req,res)=>{
        const services = allProfessionals
        const serviceIndex = services.findIndex((s)=> {s.id == req.params.id});
        let service = services[serviceIndex];

        service.profesion = req.body.profesion; 
        service.precio = req.body.precio;
        service.descripcion = req.body.descripcion;

        dbProfessionals.saveAll(services)
    
        res.redirect('/user/my-service')
        console.log(req.body)
    },
    logout: (req, res) => {
		req.session.destroy();
		return res.redirect('/');
    }
}

module.exports = controlador;