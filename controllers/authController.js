const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { User } = require("../database/models");
const { Address } = require("../database/models");

const dbProfessionals = require("../models/Professionals");
const allProfessionals = dbProfessionals.getAll()

const controlador = {

    register: (req,res) => {
        res.render ("register")
    },
    processRegister: async (req, res) => {

         const resultValidation = await validationResult(req);
         if (resultValidation.errors.length > 0) {
             return res.render('register', {
                 errors: resultValidation.mapped(),
                 oldData: req.body
             });
         }
    
    
         UserInDB = await User.findOne({
            where:{
                email: req.body.email
            }
         })

         console.log(UserInDB)

         
         if (UserInDB != null){
                return res.render('register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            }
         
    
         let passwordConfirmation = await req.body.password == req.body.passwordConfirmation
    
         if (!passwordConfirmation) {
             return res.render('register', {
                 errors: {
                     passwordConfirmation: {
                         msg: 'credenciales inválidas'
                     }
                 }
             })
         }

         await Address.create({
            localidad:req.body.localidad,
            barrio: req.body.barrio,
            direccion:req.body.direccion,
            piso:req.body.piso,
            departamento:req.body.departamento,
        })
        await User.create( {
            fullName:req.body.fullname,
            profilePicture: req.file,
            phoneNumber:req.body.phone,
            email:req.body.email,
            password: await bcrypt.hash(req.body.password, 12),
        })
        
        res.redirect('/auth/login');
        
    },
    
    login: (req,res) => {
        res.render ("login")
    },
    processLogin: (req, res) => {
        let userToLogin = User.findOne(
            {
                where: {
                    email: req.body.email,
            }
        })
        
        if(userToLogin) {
            let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
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