module.exports = (sequelize,dataTypes)=> {
    let alias = "Producto";
    let cols = {
        id:{
            type:dataTypes.INTEGER(11),
            primaryKey:true,
            autoIncrement:true,
        },
        name:{
            type:dataTypes.STRING(100),
            allowNull:false
        },
        price:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        discount:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        id_categoria:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        stock:{
            type:dataTypes.BOOLEAN,
            allowNull:false
        },
        shipment:{
            type:dataTypes.BOOLEAN,
            allowNull:false
        },
        description:{
            type:dataTypes.TEXT,
            allowNull:false
        },
        image:{
            type:dataTypes.STRING(100),
            allowNull:false       
        }

    }
    let config = {
        tableName: "productos",
        timestamps:false
    }
    const Producto = sequelize.define(alias, cols, config)

    Producto.associate = (models) => {
        Producto.belongsTo(models.Category, {
            as: "Category",
            foreignKey: "id_categoria",
        })
        Producto.hasMany(models.Carrito, {
            as: "Carrito",
            foreignKey: "id_producto"
        })
        Producto.belongsTo(models.Category, {
            as: "Historial",
            foreignKey: "id_historial",
        })
    }

    return Producto
}