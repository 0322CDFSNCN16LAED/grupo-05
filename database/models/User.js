module.exports = function(sequelize, dataTypes){

    let alias = "User" //Como sequelize llama a nuestra tabla
	let cols = {
		id: {type:dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		fullName: {type:dataTypes.STRING},
        profilePicture:{type: dataTypes.STRING},
        phoneNumber:{type: dataTypes.INTEGER},
        email: {type: dataTypes.STRING},
        password:{type:dataTypes.STRING},
        createdAt:{type:dataTypes.DATE},
        updatedAt: {type:dataTypes.DATE}
	}
	let config = {
		tableName: "users",
		timestamps: true
	}
	let User = sequelize.define(alias,cols,config);

    User.associate = function(models){
        User.hasMany(models.Address, { 
            as:"address", 
            foreignKey: "userId"
        });
        User.hasMany(models.Service, {
            as: "services",
            foreignKey: "userId"
        });
    }
    return User;
}