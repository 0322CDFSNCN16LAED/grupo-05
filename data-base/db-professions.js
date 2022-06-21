const fs = require("fs");
const path = require("path")
const professionsJson= path.join(__dirname,"db-professions.json")

module.exports = {
    getAll: function (){
        return JSON.parse(fs.readFileSync(professionsJson,"utf-8"))
    }
}