module.exports = function(sequelize, dataTypes){

    let alias = "Solicitations" //Como sequelize llama a nuestra tabla
	let cols = {
		id: {type:dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        serviceDate:{ type: dataTypes.DATE},
        serviceTime: { type: dataTypes.TIME},
        solicitationState: {type: dataTypes.STRING},
        userId:  {type:dataTypes.INTEGER},
        serviceId: {type:dataTypes.INTEGER}
	}
	let config = {
		tableName: "services_solicitations",
		timestamps: false
	}
	let Solicitations = sequelize.define(alias,cols,config);

    Solicitations.associate = function(models){
        Solicitations.belongsTo(models.User, { 
            as:"user", 
            foreignKey: "userId"
        });

        Solicitations.belongsTo(models.Service, { 
            as:"service", 
            foreignKey: "serviceId"
        });
    }

    return Solicitations;
}