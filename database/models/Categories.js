module.exports = function(sequelize, dataTypes){

    let alias = "Category" //Como sequelize llama a nuestra tabla
	let cols = {
		id: {type:dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        name:{ type: dataTypes.STRING},
        categoryPhoto: {type:dataTypes.STRING}
	}
	let config = {
		tableName: "categories",
		timestamps: false
	}
	let Category = sequelize.define(alias,cols,config);

    Category.associate = function(models){
        Category.hasMany(models.Services, { 
            as:"service", 
            foreignKey: "categoryId"
        });
    }
}