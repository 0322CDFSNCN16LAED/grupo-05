const db = require("../models/Professionals")
const allprofessionals = db.getAll()

const dbServices = require("../models/Services")
const allService = dbServices.getAll()

const controlador = {
    index: (req,res) => {
        res.render ("index",{allService:allService})
    },
    professionals: (req,res) => {
    res.render ("professionals",{allprofessionals:allprofessionals})
    },
     shop:(req,res)=>{
        res.render("shop")
    },
    deleteService:(req,res)=>{
       const filteredList = allprofessionals.filter((service)=>{
            return service.id != req.params.id;
       }) 
       db.saveAll(filteredList);
       res.redirect("../user/my-service");
    },
}

module.exports = controlador;