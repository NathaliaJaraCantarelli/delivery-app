module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    userId: { allowNull: false, type: DataTypes.INTEGER,
      references: { model: 'User', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    sellerId: { allowNull: false, type: DataTypes.INTEGER,
      references: { model: 'User', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    totalPrice: { allowNull: false, type: DataTypes.DECIMAL(9, 2) },
    deliveryAddress: { allowNull: false, type: DataTypes.STRING },
    deliveryNumber: { allowNull: false, type: DataTypes.STRING },
    saleDate: { allowNull: false, type: DataTypes.DATE },
    status: { allowNull: false, type: DataTypes.STRING },
  },
  {
    timestamps: false,
    tableName: 'sales',
    underscored: true,
  });

  Sale.associate = models => {
    Sale.belongsTo(models.User, {
      as: 'user',
      foreignKey: { name: 'userId', allowNull: false },
      onDelete: 'CASCADE'
    });
    Sale.belongsTo(models.User, {
      as: 'seller',
      foreignKey: { name: 'sellerId', allowNull: false },
      onDelete: 'CASCADE'
    });
  };

  return Sale;
};
