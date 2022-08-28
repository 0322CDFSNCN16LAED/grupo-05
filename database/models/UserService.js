module.exports = function(sequelize, dataTypes){

    let alias = "UserService" //Como sequelize llama a nuestra tabla
	let cols = {
		id: {type:dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		userId: {type:dataTypes.INTEGER},
        serviceId: {type:dataTypes.INTEGER},
		createdAt:{type:dataTypes.DATE},
        updatedAt: {type:dataTypes.DATE}
	}
	let config = {
		tableName: "user_service",
		timestamps: true
	}
	let UserService = sequelize.define(alias,cols,config);

	return UserService;
}