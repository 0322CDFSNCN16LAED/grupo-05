const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User');
const dbProfessionals = require("../models/Professionals")
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

		let userInDB = User.findByField('Email', req.body.email);

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
        let newUserID = User.generateId()
		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
            id: newUserID
		}

		let userCreated = User.create(userToCreate);

		return res.redirect('/user/login');
        
    },
   
    login: (req,res) => {
        res.render ("login")
    },
    registerProfessionals: (req,res) => {
        res.render ("register-professional")
    },
    processRegisterProfessionals: (req, res) => {
        res.send(req.body)
    },
    
    account: (req,res) => {
        res.render ("account")
    },
    addService: (req,res) => {
        res.render ("add-service")
    },
    storeService: (req,res) => {
        const newProfessiona = req.body;
        if(allProfessionals.length){
            newProfessiona.id= allProfessionals[allProfessionals.length - 1].id +1;
        }else {
            newProfessiona.id = 1;
        }
        newProfessiona.imagen = "foto1.jpg"

        allProfessionals.push(newProfessiona);

        dbProfessionals.saveAll(allProfessionals);

        res.redirect ("/professionals")
    },
    myService: (req,res) => {
        res.render ("my-service")
    },
    
}

module.exports = controlador;