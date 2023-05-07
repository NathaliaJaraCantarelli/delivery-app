'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', {
      sale_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'sales',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    }, {
      tableName: 'sales_products',
      timestamps: false,
    });

    await queryInterface.addIndex('sales_products', ['sale_id', 'product_id'], {
      unique: true,
      name: 'sales_products_index',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('sales_products');
  },
};
