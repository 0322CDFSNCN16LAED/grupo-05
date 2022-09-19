
module.exports = function(sequelize, dataTypes){

    let alias = "Reviews" //Como sequelize llama a nuestra tabla
	let cols = {
		id: {type:dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        serviceId: {type: dataTypes.INTEGER},
        userId: {type: dataTypes.INTEGER},
		satisfactionReview: {type: dataTypes.INTEGER},
		commentReview: {type: dataTypes.STRING}
	}
	let config = {
		tableName: "reviews",
		timestamps: false
	}
	let Reviews = sequelize.define(alias,cols,config);

    Reviews.associate = function(models){
        Reviews.belongsTo(models.Service, { 
            as:"service", 
            foreignKey: "ServiceId"
        });
		Reviews.belongsTo(models.User, { 
            as:"User", 
            foreignKey: "userId"
        });
    }

    return Reviews;
}