const fs = require("fs");
const path = require("path")
const servicesJson= path.join(__dirname,"../data-base/Services.json")
const db = require("../database")

module.exports = {
    getAll: function (){
        return JSON.parse(fs.readFileSync(servicesJson,"utf-8"))
    },
    saveAll: function (service) {
        const fileTxt = JSON.stringify(service, null, 4);

        fs.writeFileSync(professionalsJson, fileTxt);
    },
}