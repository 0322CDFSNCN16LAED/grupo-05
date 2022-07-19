const fs = require("fs");
const path = require("path")
const professionalsJson= path.join(__dirname,"../data-base/Professionals.json")

module.exports = {
    getAll: function (){
        return JSON.parse(fs.readFileSync(professionalsJson,"utf-8"))
    },
    saveAll: function (service) {
        const fileTxt = JSON.stringify(service, null, 4);

        fs.writeFileSync(professionalsJson, fileTxt);
    },
    getOne: function (id) {
        return this.getAll().find((p) => p.id == id);
    },
}