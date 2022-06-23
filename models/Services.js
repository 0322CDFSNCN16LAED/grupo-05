const fs = require("fs");
const path = require("path")
const servicesJson= path.join(__dirname,"../data-base/Services.json")

module.exports = {
    getAll: function (){
        return JSON.parse(fs.readFileSync(servicesJson,"utf-8"))
    }
}