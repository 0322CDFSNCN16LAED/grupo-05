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
        const newProfessional = req.body;
        newProfessional.nombre = req.session.userLogged.fullname;
        if(allProfessionals.length){
            newProfessional.id= allProfessionals[allProfessionals.length - 1].id +1;
        }else {
            newProfessional.id = 1;
        }
        if(req.file){
            newProfessional.imagen = req.file.filename;       
        }
        allProfessionals.push(newProfessional);
        dbProfessionals.saveAll(allProfessionals);
        res.redirect ("/professionals");
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
        res.send(product)
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