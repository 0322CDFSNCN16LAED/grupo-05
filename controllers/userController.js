

const controlador = {
   
    login: (req,res) => {
        res.render ("login")
    },
    register: (req,res) => {
        res.render ("register")
    },
    registerProfessionals: (req,res) => {
        res.render ("register-professional")
    },
    account: (req,res) => {
        res.render ("account")
    },
    addService: (req,res) => {
        res.render ("add-service")
    },
    storeService: (req,res) => {
        res.send(req.body)
    },
    myService: (req,res) => {
        res.render ("my-service")
    },
    
}

module.exports = controlador;