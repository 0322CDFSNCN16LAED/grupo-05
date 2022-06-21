const fs = require("fs");
const path = require("path")
const servicejson= path.join(__dirname,"db.json")

module.exports = {
    getAll: function (){
        return JSON.parse(fs.readFileSync(servicejson,"utf-8"))
    }
}