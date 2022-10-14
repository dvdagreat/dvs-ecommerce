'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const tables = ['users', 'products'];
    const columns = ['createdAt', 'updatedAt'];

    tables.forEach((table, index) => {
      columns.forEach((column, index) => {
        let sql;
        if (column === 'updatedAt') {
          sql = `ALTER TABLE ${table} CHANGE updatedAt updatedAt DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;`
        } else {
          sql = `ALTER TABLE ${table} CHANGE createdAt createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;`
        }
        queryInterface.sequelize.query(sql);
      });
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.changeColumn('Users', 'createdAt', {
      defaultValue: null
    });

    queryInterface.changeColumn('Users', 'updatedAt', {
      defaultValue: null
    });

    queryInterface.changeColumn('Products', 'createdAt', {
      defaultValue: null
    });

    queryInterface.changeColumn('Products', 'updatedAt', {
      defaultValue: null
    });
  }
};
