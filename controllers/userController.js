const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const { User } = require("../database/models");
const { Category } = require("../database/models");
const { Service } = require("../database/models");
const { ServicePhoto } = require("../database/models");


const dbProfessionals = require("../models/Professionals");
const allProfessionals = dbProfessionals.getAll()


const controlador = {
   
    account: (req,res) => {
        res.render ("account")
    },
    modifyAccount: (req,res) => {
        res.render ("modify-account")
    },
    processModifyAccount: (req,res) => {
        // logica
    },
    addService: (req,res) => {
        Category.findAll()
        .then(function(result) {
            res.render("add-service", { categorias : result })})
    },
    storeService: async (req,res) => {
        const newService = await req.body;
        const ServiceToCreate = await Service.create ({
            categoryId: newService.profesion,
            jobDescription: newService.descripcion,
            price: newService.precio,
            userId: req.session.userLogged.id
        })
        for (let i = 0; i < req.files.length; i ++) {
            const ServicePhotoToCreate = await ServicePhoto.create({
                photo: req.file? req.file.filename : "default.jpg",
                serviceId: ServiceToCreate.id
            })
        }
        res.redirect("/user/my-service");
    },
    myService: async (req,res) => {
       const services = await Service.findAll({
            where: {
                userId: req.session.userLogged.id
            },
            include: [
                {association: "category"},
                {association: "user"},
                {association: "servicePhoto"}
            ]
        })
        res.render ("my-service", { services })
    },
     deleteService:(req,res)=>{
      db.Service.findByPk(req.params.id).then((service)=>{
        service.setServicePhoto([]).then(()=>{
            service.destroy().then(()=>{
                res.redirect("/user/my-service");
            })
        })

      })
    
     
    },
    modifyService:(req,res)=>{
        let pedidoService = db.Service.findByPk(req.params.id)
        let pedidoCategory = db.Category.findAll();
        Promise.all([pedidoService,pedidoCategory])
        .then(function([servicio,categoria]){
            res.render("modify-service",{servicio,categoria})
        })
       
    }, 
    serviceDetail: async (req,res)=>{

        const servicio = await Service.findOne({
            where: {
                id : req.params.id
            },
            include: [
                    {association: "category"},
                    {association: "user"},
                    {association: "servicePhoto"}
            ]
        })

        res.render("service-detail", { servicio })

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

    },
    logout: (req, res) => {
		req.session.destroy();
		return res.redirect('/');
    }
}

module.exports = controlador;