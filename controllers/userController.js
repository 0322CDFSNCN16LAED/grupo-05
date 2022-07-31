const db = require("../database/models")

let userController = {
    
account: (req,res) => {

},
myService: (req,res) => {

},
add:  (req,res) => {
        db.Category.findAll()
            .then(function(category){
                return res.render ("add-service",{category});
            })
    },
store: (req,res) => {
    db.Service.create ({
            
    })
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