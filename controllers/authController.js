const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User');
const dbProfessionals = require("../models/Professionals");
const allProfessionals = dbProfessionals.getAll()
const db = require("../database/models");
const controlador = {

    register: (req,res) => {
        res.render ("register")
    },
    processRegister: (req, res) => {
        // const resultValidation = validationResult(req);
        // if (resultValidation.errors.length > 0) {
        //     return res.render('register', {
        //         errors: resultValidation.mapped(),
        //         oldData: req.body
        //     });
        // }
        db.Address.create({
            localidad:req.body.localidad,
            barrio: req.body.barrio,
            direccion:req.body.direccion,
            piso:req.body.piso,
            departamento:req.body.departamento,
        })
        db.User.create( {
            fullName:req.body.fullname,
            phoneNumber:req.body.phone,
            email:req.body.email,
            password:req.body.password,
        })
    
    
        // let userInDB = User.findByField('email', req.body.email);
    
        // if (userInDB) {
        //     return res.render('register', {
        //         errors: {
        //             email: {
        //                 msg: 'Este email ya está registrado'
        //             }
        //         },
        //         oldData: req.body
        //     });
        // }
    
        // let passwordConfirmation = req.body.password == req.body.passwordConfirmation
    
        // if (!passwordConfirmation) {
        //     return res.render('register', {
        //         errors: {
        //             passwordConfirmation: {
        //                 msg: 'credenciales inválidas'
        //             }
        //         }
        //     })
        // }
        
    
        // let newUserID = User.generateId()
        // let userToCreate = {
        //     ...req.body,
        //     password: bcryptjs.hashSync(req.body.password, 10),
        //     id: newUserID,
        // }
        // if(req.file){
        //     userToCreate.imagen = req.file.filename;       
        // }
        // delete userToCreate.passwordConfirmation;
    
        // let userCreated = User.create(userToCreate);
    
        return res.redirect('/auth/login');
        
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
            else {
                return res.render('login', {
                    errors: {
                        password: {
                            msg: 'credenciales inválidas'
                        }
                    }
                });
            } 
        }
        else {
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'credenciales inválidas'
                    }
                }
            });
        }
    
    },
    logout: (req, res) => {
		req.session.destroy();
		return res.redirect('/');
    }
}
module.exports = controlador