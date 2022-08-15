const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User');
const dbProfessionals = require("../models/Professionals");
const allProfessionals = dbProfessionals.getAll()


const controlador = {
   
    account: (req,res) => {
        res.render ("account")
    },
    addService: (req,res) => {
        res.render ("add-service")
    },
    storeService: (req,res) => {
        const newService = req.body;
        newService.nombre = req.session.userLogged.fullname;
        db.Service.create ({
            categoryId: dbProfessionals.getCategoryId(req.body.profesion),
            jobDescription: newService.descripcion,
            price: newService.precio,
            userId: req.session.userLogged.id
            /* if(req.file){
                photo = req.file.filename;       
            } */
        })
        res.redirect("/professionals")
    },
    myService: (req,res) => {
        const allProfessionals = dbProfessionals.getAll()
        res.render ("my-service", {allprofessionals : allProfessionals})
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