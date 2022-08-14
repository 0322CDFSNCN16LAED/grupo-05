module.exports = function(sequelize, dataTypes){

    let alias = "Address" //Como sequelize llama a nuestra tabla
	let cols = {
		id: {type:dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		localidad: {type:dataTypes.STRING, allowNull:false},
        barrio:{ type: dataTypes.STRING, allowNull:false},
        direccion: {type: dataTypes.STRING, allowNull:false},
        piso: {type:dataTypes.INTEGER},
        departamento: {type:dataTypes.STRING},
        userId: {type:dataTypes.INTEGER},
        createdAt:{type:dataTypes.DATE},
        updatedAt: {type:dataTypes.DATE}
	}
	let config = {
		tableName: "addresses",
		timestamps: true
	}
	let Address = sequelize.define(alias,cols,config);

    Address.associate = function(models){
        Address.belongsTo(models.User, { 
            as:"user", 
            foreignKey: "userId"
        });

    }
    return Address;
}