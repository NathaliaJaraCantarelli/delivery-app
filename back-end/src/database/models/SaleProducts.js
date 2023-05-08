module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: { allowNull: false, type: DataTypes.INTEGER,
      references: { model: 'Sale', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    productId: { allowNull: false, type: DataTypes.INTEGER,
      references: { model: 'Product', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'sales_products',
    timestamps: false,
    underscored: true
  });

  SaleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId'
    });
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId'
    });
  };

  return SaleProduct;
};
