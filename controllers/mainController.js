const path = require('path');

let mainController = {
    home: (req,res) => {
        res.render('home');
    }
}

module.exports=mainController;