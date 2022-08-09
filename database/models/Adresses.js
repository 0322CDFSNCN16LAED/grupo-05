module.exports = function(sequelize, dataTypes){

    let alias = "Address" //Como sequelize llama a nuestra tabla
	let cols = {
		id: {type:dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		localidad: {type:dataTypes.STRING, allowNull:false},
        barrio:{ type: dataTypes.STRING, allowNull:false},
        calle: {type: dataTypes.STRING, allowNull:false},
        numero:  {type:dataTypes.INTEGER, allowNull:false},
        piso: {type:dataTypes.INTEGER},
        departamento: {type:dataTypes.STRING},
        userId: {type:dataTypes.INTEGER}
	}
	let config = {
		tableName: "addresses",
		timestamps: false
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