module.exports = function(sequelize, dataTypes){

    let alias = "ServicePhoto" //Como sequelize llama a nuestra tabla
	let cols = {
		id: {type:dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		photo: {type:dataTypes.STRING},
        serviceId: {type:dataTypes.INTEGER}
	}
	let config = {
		tableName: "servicesphotos",
		timestamps: false
	}
	let ServicePhoto = sequelize.define(alias,cols,config);

    ServicePhoto.associate = function(models){
        ServicePhoto.belongsTo(models.Service, { 
            as:"service", 
            foreignKey: "serviceId"
        });
    }
}