const servicios = require('../dataBase/servicios.js')

let productController = {
    options: (req,res)=>{
        res.render('product-options', {'servicios' : servicios});
    },
    detail: (req,res) => {
        let productoBuscado = servicios.find((producto)=>{
            return producto.id == req.params.id;
        })
        if(productoBuscado){
            res.render('product-detail', {'producto': productoBuscado});
        }
        else{
            res.render('error');
        }
    }
}

module.exports = productController;