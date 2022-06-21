module.exports = (sequelize, dataTypes) => {
    let alias = "Historial";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type:dataTypes.STRING(100),
            allowNull:false
        },
        logo:{
            type:dataTypes.STRING(100),
            allowNull:false       
        },
        id_usuario: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    };

    let config = {
        tableName: "historial",
        timestamps: false,
    };

    const Historial = sequelize.define(alias, cols, config);

    Historial.associate = (models) => {
        Historial.belongsTo(models.User, {
            as: "user",
            foreignKey: "id_usuario"
        })
        Historial.hasMany(models.Producto, {
            as: "producto",
            foreignKey: "id_historial"
        })
    }

    return Historial;
}