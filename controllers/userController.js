const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User');
const dbProfessionals = require("../models/Professionals");
const { findByPk } = require('../models/User');
const allProfessionals = dbProfessionals.getAll()

const controlador = {
    register: (req,res) => {
        res.render ("register")
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

        let passwordConfirmation = req.body.password == req.body.passwordConfirmation

        if (!passwordConfirmation) {
            return res.render('register', {
                errors: {
                    passwordConfirmation: {
                        msg: 'Debes escribir la misma contraseña'
                    }
                }
            })
        }


        let newUserID = User.generateId()
		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
            id: newUserID,
		}
        delete userToCreate.passwordConfirmation;

		let userCreated = User.create(userToCreate);

		return res.redirect('/user/login');
        
    },
   
    login: (req,res) => {
        res.render ("login")
    },
    processLogin: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				//if(req.body.remember_user) {
				//	res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				//}
				return res.redirect('/');
			} 
		}
        else {
            return res.render('login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
        }

    },
    
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
    modifyService:(req,res)=>{
        let id = req.params.id;
        res.render("modify-service", {serviceId : req.params.id})
    }, 
    processModifyService:(req,res)=>{
        //const services = dbProfessionals.getAll();
        //const serviceIndex = services.findIndex((s)=> {s.id == req.params.id});
        //let service = services[serviceIndex];

        res.send(req.body)

        //const modifiedService = req.body;

        //service.profesion = modifiedService.profesion;
        //service.precio = modifiedService.precio;
        //service.descripcion = modifiedService.descripcion;
        //dbProfessionals.saveAll(services)
    
        //res.redirect('/user/my-service')
    },
    logout: (req, res) => {
		req.session.destroy();
		return res.redirect('/');
    }
}

module.exports = controlador;