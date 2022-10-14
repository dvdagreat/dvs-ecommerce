'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'gaming keyboard 1',
        price: 20,
        quantity: 100,
      },
      {
        name: 'gaming keyboard 2',
        price: 20,
        quantity: 100,
      },
      {
        name: 'gaming keyboard 3',
        price: 20,
        quantity: 100,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Products', null, {});
  }
};
