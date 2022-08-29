module.exports = function(sequelize, dataTypes){

    let alias = "Service" //Como sequelize llama a nuestra tabla
	let cols = {
		id: {type:dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		categoryId: {type:dataTypes.INTEGER},
        jobDescription:{ type: dataTypes.STRING} ,
        price: {type: dataTypes.INTEGER},
        userId:  {type:dataTypes.INTEGER}
	}
	let config = {
		tableName: "services",
		timestamps: false
	}
	let Service = sequelize.define(alias,cols,config);

    Service.associate = function(models){
        Service.belongsTo(models.Category, { 
            as:"category", 
            foreignKey: "categoryId"
        });
        Service.hasMany(models.ServicePhoto, {
            as: "servicePhoto",
            foreignKey: "serviceId"
        });
        Service.belongsTo(models.User, { 
            as:"user", 
            foreignKey: "userId"
        });
        Service.hasMany(models.Solicitations, {
            as: "solicitations",
            foreignKey: "serviceId"
        });
    }

    return Service;
}