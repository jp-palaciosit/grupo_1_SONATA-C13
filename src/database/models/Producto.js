module.exports = (sequelize,dataTypes)=> {
    let alias = "Producto";
    let cols = {
        id:{
            type:dataTypes.INTEGER(11),
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
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
            type:dataTypes.INTEGER(11)
        },
        categoryId:{
            type:dataTypes.INTEGER(11)
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
            type:dataTypes.STRING(100)        
        }

    }
    let config = {
        tableName: "productos",
        timestamps:false
    }
    const Producto = sequelize.define(alias, cols, config)
    return Producto
}