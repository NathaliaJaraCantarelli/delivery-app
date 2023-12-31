'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { 
        allowNull: false, 
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      role: { 
        allowNull: false,
        type: Sequelize.STRING,
      },
    }, {
      tableName: 'users',
      timestamps: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
