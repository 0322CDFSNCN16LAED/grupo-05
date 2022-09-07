const fs = require("fs");
const path = require("path")
const professionalsJson= path.join(__dirname,"../data-base/Professionals.json")
const db = require("../database/models")

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
    getFilteredProfessionals: function(opcion){
        const allProfessionals = this.getAll();
        switch(opcion){
            case "Albañileria":
                filteredProfessionals = allProfessionals.filter((p)=>{
                    return p.profesion == "Albañil";
                })
                break;
            case "Seguridad":
                filteredProfessionals = allProfessionals.filter((p)=>{
                    return p.profesion == "Seguridad";
                })
                break;
            case "Carpinteria":
                filteredProfessionals = allProfessionals.filter((p)=>{
                    return p.profesion == "Carpintero";
                })
                break;
            case "Electricidad":
                filteredProfessionals = allProfessionals.filter((p)=>{
                    return p.profesion == "Electricista";
                })
                break;
            case "Gas":
                filteredProfessionals = allProfessionals.filter((p)=>{
                    return p.profesion == "Gasista";
                })
                break;
            case "Jardineria":
                filteredProfessionals = allProfessionals.filter((p)=>{
                    return p.profesion == "Jardineria";
                })
                break;
            case "Niñera":
                filteredProfessionals = allProfessionals.filter((p)=>{
                    return p.profesion == "Niñera";
                })
                break;
            case "Pintura":
                filteredProfessionals = allProfessionals.filter((p)=>{
                    return p.profesion == "Pintor";
                })
                break;  
            case "Plomeria":
                filteredProfessionals = allProfessionals.filter((p)=>{
                    return p.profesion == "Plomero";
                })
                break; 
            case "Climatizacion":
                filteredProfessionals = allProfessionals.filter((p)=>{
                    return p.profesion == "Tec. Aire";
                })
                break;   
            case "PC":
                filteredProfessionals = allProfessionals.filter((p)=>{
                    return p.profesion == "Tec. Pc";
                })
                break; 
            case "Mudanza":
                filteredProfessionals = allProfessionals.filter((p)=>{
                    return p.profesion == "Mudanza";
                })
                break; 
        }
        return filteredProfessionals;
    },
    getCategoryId: function(category){
        for (let i = 0; i<db.Category.length ; i++){
            if(category == db.Category[i].name){
                return db.Category[i].id;
            }
        }

    }
}