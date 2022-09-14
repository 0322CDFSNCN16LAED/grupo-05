
module.exports = function(sequelize, dataTypes){

    let alias = "Notifications" //Como sequelize llama a nuestra tabla
	let cols = {
		id: {type:dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        solicitationId: {type: dataTypes.INTEGER},
        text: {type: dataTypes.STRING}
	}
	let config = {
		tableName: "notifications",
		timestamps: false
	}
	let Notifications = sequelize.define(alias,cols,config);

    Notifications.associate = function(models){
        Notifications.belongsTo(models.Solicitations, { 
            as:"solicitation", 
            foreignKey: "solicitationId"
        });
    }

    return Notifications;
}