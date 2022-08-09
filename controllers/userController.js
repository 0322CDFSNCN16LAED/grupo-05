const db = require("../database/models")

let userController = {
    
account: (req,res) => {

},
myService: (req,res) => {

},
addService:  (req,res) => {
        db.Category.findAll()
            .then(function(category){
                return res.render ("add-service",{category});
            })
    },
storeService: (req,res) => {
    const newService = req.body;
    newService.nombre = req.session.userLogged.fullname;
    db.Service.create ({
        categoryId:1,
        jobDescription: newService.descripcion,
        price: newService.precio,
        userId: req.session.userLogged.id
    })
    res.redirect()
    /*const newProfessional = req.body;
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
        res.redirect ("/professionals");*/
},
modify: (req,res) => {

},
processModify: (req,res) => {

},

delete: (req,res) => {

},
shop: (req,res) => {

},
}
module.exports = userController;