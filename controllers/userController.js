let userController = {
    login: (req,res)=>{
        res.render('login');
    },
    register: (req,res) => {
        res.render('register')
    },
    workerRegister: (req,res) => {
        res.render('worker-register')
    }
}

module.exports = userController;