module.exports = (sequelize, dataTypes) => {
    let alias = "Rols";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nameRol: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
    };

    let config = {
        tableName: "roles",
        timestamps: false,
    };

    const Rols = sequelize.define(alias, cols, config);

    Rols.associate = (models) => {
        Rols.hasMany(models.User, {
            as: "users",
            foreignKey: "id_rol"
        })
    }

    return Rols;
}