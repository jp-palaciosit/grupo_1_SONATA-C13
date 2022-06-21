module.exports = (sequelize, dataTypes) => {
    let alias = "Carrito";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        id_usuario: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        id_producto: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    };

    let config = {
        tableName: "carrito",
        timestamps: false,
    };

    const Carrito = sequelize.define(alias, cols, config);

    Carrito.associate = (models) => {
        Carrito.belongsTo(models.User, {
            as: "user",
            foreignKey: "id_usuario"
        })
        Carrito.belongsTo(models.Producto, {
            as: "productos",
            foreignKey: "id_producto"
        })
    }

    return Carrito;
}