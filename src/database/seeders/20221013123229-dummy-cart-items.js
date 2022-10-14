'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cartdetails', [
      {
        product_id: 1,
        cart_id: 1,
        quantity: 5
      },
      {
        product_id: 2,
        cart_id: 1,
        quantity: 5
      },
      {
        product_id: 3,
        cart_id: 1,
        quantity: 5
      },
      {
        product_id: 1,
        cart_id: 2,
        quantity: 5
      },
      {
        product_id: 2,
        cart_id: 2,
        quantity: 5
      },
      {
        product_id: 3,
        cart_id: 2,
        quantity: 5
      },
      {
        product_id: 1,
        cart_id: 3,
        quantity: 5
      },
      {
        product_id: 2,
        cart_id: 3,
        quantity: 5
      },
      {
        product_id: 3,
        cart_id: 3,
        quantity: 5
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Cartdetails', null, {});
  }
};
