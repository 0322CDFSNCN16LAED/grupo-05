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
        if(req.file){
           const newProfessional = req.body;
        newProfessional.imagen = req.file.filename;
        if(allProfessionals.length){
            newProfessional.id= allProfessionals[allProfessionals.length - 1].id +1;
        }else {
            newProfessional.id = 1;
        }
        console.log(req.body)
        // newProfessional ={
        //     ...locals.userLogged,
        //     imagen: req.file.filename,
        //     categoria: req.body.categoria,
        // }
        allProfessionals.push(newProfessional);

        dbProfessionals.saveAll(allProfessionals);

        res.redirect ("/professionals")   
        }else{
            res.render("/user/add-service")
        }
      
    },
    myService: (req,res) => {
        res.render ("my-service")
    },
    
}

module.exports = controlador;