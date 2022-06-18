module.exports = (sequelize, dataTypes) => {
    let alias = "Category";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false,
        }
    };

    let config = {
        tableName: "categoria",
        timestamps: false,
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = (models) => {
        Category.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "id_categoria"
        })
    }

    return Category;
}