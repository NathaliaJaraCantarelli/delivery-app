'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { 
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(4, 2),
        defaultValue: 0.0,
      },
      url_image: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
    }, {
      tableName: 'products',
      timestamps: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  },
};
