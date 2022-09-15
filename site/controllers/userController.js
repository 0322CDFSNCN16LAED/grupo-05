const bcryptjs = require('bcryptjs');
const fetch = require('node-fetch');
const { validationResult } = require('express-validator');
const fs = require('fs')

const db = require('../database/models');
const { User } = require("../database/models");
const { Category } = require("../database/models");
const { Service } = require("../database/models");
const { ServicePhoto } = require("../database/models");
const { Address } = require("../database/models");
const { Solicitations } = require("../database/models");
const { Notifications } = require("../database/models");


const dbProfessionals = require("../models/Professionals");
const allProfessionals = dbProfessionals.getAll()


const controlador = {
   
    account: (req,res) => {
        res.render ("account")
    },
    modifyAccount: async (req,res) => {
        
        const provinciasFetch = await fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre")
        const provinciasJSON = await provinciasFetch.json()
        const provincias = provinciasJSON.provincias
        
        
        res.render ("modify-account", { provincias })
    },
    processModifyAccount: async (req,res) => {
        
        const resultValidation = validationResult(req);
         if (resultValidation.errors.length > 0) {
             
             const provinciasFetch = await fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre")
             const provinciasJSON = await provinciasFetch.json()
             const provincias = provinciasJSON.provincias
             
             return res.render('modify-account', {
                 errors: resultValidation.mapped(),
                 provincias: provincias
                });
            }
            
            const userBuscado = await User.findByPk(req.params.id)
            const addressBuscada = await Address.findOne({
                where: {
                    userId: req.params.id
                }
        })
        await userBuscado.update({
            fullName: req.body.fullname,
            profilePicture: req.body.profilePicture,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            profilePicture: req.file? req.file.filename : userBuscado.profilePicture
        })
        await addressBuscada.update({
            localidad: req.body.localidad,
            barrio: req.body.barrio,
            direccion: req.body.direccion,
            piso: req.body.piso,
            departamento: req.body.departamento,
        })
        
        req.session.userLogged = await User.findByPk(userBuscado.id, {
            include: [{association: "address"}]
        })
        
        res.redirect("/user/account");
    },
    addService: (req,res) => {
        Category.findAll()
        .then(function(result) {
            res.render("add-service", { categorias : result })})
        },
        storeService: async (req,res) => {
            
            const resultValidation = await validationResult(req);
            if (resultValidation.errors.length > 0) {
                
                if(req.files) {
                    console.log(req.files[0]);
                    for (let i = 0; i < req.files.length; i ++) {
                        fs.unlink(`public/images/avatars/${req.files[i].filename}`, (err => {
                            if(err) {
                                console.log(err)
                            }else{
                                console.log(`archivo: ${req.files[i].filename} borrado con exito`)
                            }
                        }))
                    }
                }
                
                const categorias = await Category.findAll()
                return res.render('add-service', {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    categorias
                });
            }
            
            const newService = await req.body;
            const ServiceToCreate = await Service.create ({
                categoryId: newService.profesion,
                jobDescription: newService.descripcion,
                price: newService.precio,
                userId: req.session.userLogged.id
            })
            if (req.file) {
                const ServicePhotoToCreate = await ServicePhoto.create({
                    photo: req.files? req.file.filename : "default.jpg",
                    serviceId: ServiceToCreate.id
                })
            } else if (req.files) {
                for (let i = 0; i < req.files.length; i ++) {
                    const ServicePhotoToCreate = await ServicePhoto.create({
                        photo: req.files? req.files[i].filename : "default.jpg",
                        serviceId: ServiceToCreate.id
                    })
                }
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
            Service.findByPk(req.params.id).then((service)=>{
                service.setServicePhoto([]).then(()=>{
                    service.destroy().then(()=>{
                        res.redirect("/user/my-service");
                    })
                })
            })
        },
        frequentQuestions:(req,res) => {
            res.render("frequentQuestions")
        },
        modifyService: async (req,res)=>{
            
        const servicio = await Service.findByPk(req.params.id , {
            include: [
                {association: "servicePhoto"}
            ]
        })
        const categoria = await Category.findAll();
        
        res.render("modify-service", { servicio, categoria })
        
    }, 
    serviceDetail: async (req,res)=>{
        
        const servicio = await Service.findOne({
            where: {
                id : req.params.id
            },
            include: [
                    {association: "category"},
                    {association: "user",
                include: [
                    {association: "address"}
                ]},
                    {association: "servicePhoto"}
            ]
        })
        res.render("service-detail", { servicio })

    },
    processModifyService: async (req,res)=>{

        const resultValidation = await validationResult(req);
        if (resultValidation.errors.length > 0) {

            if(req.files) {
                console.log(req.files[0]);
                for (let i = 0; i < req.files.length; i ++) {
                    fs.unlink(`public/images/avatars/${req.files[i].filename}`, (err => {
                        if(err) {
                            console.log(err)
                        }else{
                            console.log(`archivo: ${req.files[i].filename} borrado con exito`)
                        }
                    }))
                }
            }

        const servicio = await Service.findByPk(req.params.id , {
                include: [
                    {association: "servicePhoto"}
                ]
            })
        const categoria = await Category.findAll();
          
            return res.render('modify-service', {
                errors: resultValidation.mapped(),
                oldData: req.body,
                categoria,
                servicio
            });
        }

        const service = await Service.findByPk(req.params.id)

        const serviceToUpdate = await Service.update ({
            categoryId: req.body.profesion,
            jobDescription: req.body.descripcion,
            price: req.body.precio,
            userId: req.session.userLogged.id
        },{
            where: {
                id: req.params.id,
            }
        })
        if (req.file) {
            const ServicePhotoToCreate = await ServicePhoto.create({
                photo: req.files? req.file.filename : "default.jpg",
                serviceId: service.id
            })
        } else if (req.files) {
            for (let i = 0; i < req.files.length; i ++) {
                const ServicePhotoToCreate = await ServicePhoto.create({
                    photo: req.files? req.files[i].filename : "default.jpg",
                    serviceId: service.id
                })
            }
        }
        res.redirect("/user/my-service");

    },
    notifications: async (req, res) => {

        const servicios = await Service.findAll({
            where: {
                userId: req.session.userLogged.id
            },
            include:[{ //Incluye asociaciones del usuario
                association:"solicitations",
                include:[{ //Incluye asociaciones de la solicitation
                  association:"user",
                  include: [
                    {association: "address"}
                  ]
                }]
              },
              {association:"category"}
            ]
        })

        res.render("notifications", { servicios })
    },

    // Solicitudes de servicio

    serviceSolicitation: async (req, res) => {

        const resultValidation = await validationResult(req);
        if (resultValidation.errors.length > 0) {

            const servicio = await Service.findOne({
                where: {
                    id : req.params.id
                },
                include: [
                        {association: "category"},
                        {association: "user",
                    include: [
                        {association: "address"}
                    ]},
                        {association: "servicePhoto"}
                ]
            })
            return res.render("service-detail", { 
                errors: resultValidation.mapped(),
                servicio })
        }



        await Solicitations.create({
            userId: req.session.userLogged.id,
            serviceId: req.params.id,
            serviceDate: req.body.date,
            serviceTime: req.body.time,
            solicitationState: "Pendiente"
        })
        

        res.redirect("/")
    },
    servicePending: async (req,res)=>{

        const usuario = await User.findOne({
            where: {
                id: req.session.userLogged.id
            },
            include:[{ //Incluye asociaciones del usuario
                association:"solicitations",
                include:[{ //Incluye asociaciones de la solicitation
                  association:"service",
                  include:["user","category"] //Incluye asociaciones del servicio
                },
                {association: "notification"}            
            ]
              }]
            })

        for(let i = 0; i < usuario.solicitations.length; i ++) {
            let notificacionBorrada = await Notifications.destroy({
                where: {
                    solicitationId: usuario.solicitations[i].id
                }
            })
        }

        res.render("service-pending", { usuario })
    },

    // Profesional-Servicio

    acceptService: async (req, res) => {


        const solicitud = await Solicitations.update({
            solicitationState: "Aceptada"
        },{
           where: {
            id: req.params.id
           } 
        }
        )

        const notificacionExistente = await Notifications.findOne({
            where: {
                solicitationId: req.params.id
            }
        })
        if (notificacionExistente) {
            notificacionExistente.update({
                text: "Tu solicitud fue aceptada!"
            })
        }else {
            const notificacion = await Notifications.create({
                solicitationId: req.params.id,
                text: "Tu solicitud fue aceptada!"
             })
        }

        res.redirect("/user/notifications")

    },
    rejectService: async (req, res) => {

        const solicitud = await Solicitations.destroy({
            where: {
                id: req.params.id
            }
            }
        )

        res.redirect("/user/notifications")
        
    },
    changeDate: async (req, res) => {

        const solicitud = await Solicitations.findByPk(req.params.id)
        
        solicitud.update({
            solicitationState: "Aceptada",
            serviceDate: req.body.date,
            serviceTime: req.body.time
        })

        const notificacion = await Notifications.create({
            solicitationId: req.params.id,
            text: "El profesional te sugirio otra fecha"
         })

        res.redirect("/user/notifications")
    },
    cancelService: async (req, res) => {

        const solicitud = await Solicitations.findByPk(req.params.id)

        solicitud.update({
            solicitationState: "Cancelada"
        })

        const notificacionExistente = await Notifications.findOne({
            where: {
                solicitationId: req.params.id
            }
        })
        if (notificacionExistente) {
            notificacionExistente.update({
                text: "El profesional cancelo la fecha confirmada"
            })
        }else {
            const notificacion = await Notifications.create({
                solicitationId: req.params.id,
                text: "El profesional cancelo la fecha confirmada"
             })
        }

        res.redirect("/user/notifications")

    },
    filerByLocation: async (req,res) => {

        const servicios = await Service.findAll({
            where: {
                categoryId: req.params.id
            },
            include: [
                {association: "category"},
                {association: "servicePhoto"},
                {association:"user",
            include: [
                {association:"address"}
            ]}
            ]
        })

        const usuario =  req.session.userLogged
        const serviciosFiltrados = []

        for (let i = 0; i < servicios.length; i ++) {
            if(servicios[i].user.address[0].barrio == usuario.address[0].barrio) {

                serviciosFiltrados.push(servicios[i])
            }
        }

        res.render("filteredByLocationProfessionals", { serviciosFiltrados })
    },
    removeServiceImage: async (req, res) => {

        const imagenBuscada = await ServicePhoto.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {association: "service"}
            ]
        })

        const ServicioBuscado = await Service.findOne({
            where: {
                id: imagenBuscada.service.id
            }
        })

        const imagenBorrada = await ServicePhoto.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect(`/user/modify-service/${ServicioBuscado.id}`)

    }
}

module.exports = controlador;