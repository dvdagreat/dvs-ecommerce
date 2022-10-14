'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'dvdagreat1',
        first_name: 'divyesh',
        last_name: 'ladva',
        role: 'user',
        password: '$argon2id$v=19$m=4096,t=3,p=1$u+D4uHWtgNXGPOguGOdMYA$LT3M08otTgzC0upM3ziFOcXPyln0KhXlaDy8vqa5AZc',
        email_address: 'dvs1@gmail.com'
      },
      {
        username: 'dvdagreat2',
        first_name: 'divyesh',
        last_name: 'ladva',
        role: 'user',
        password: '$argon2id$v=19$m=4096,t=3,p=1$u+D4uHWtgNXGPOguGOdMYA$LT3M08otTgzC0upM3ziFOcXPyln0KhXlaDy8vqa5AZc',
        email_address: 'dvs2@gmail.com'
      },
      {
        username: 'dvdagreat3',
        first_name: 'divyesh',
        last_name: 'ladva',
        role: 'user',
        password: '$argon2id$v=19$m=4096,t=3,p=1$u+D4uHWtgNXGPOguGOdMYA$LT3M08otTgzC0upM3ziFOcXPyln0KhXlaDy8vqa5AZc',
        email_address: 'dvs3@gmail.com'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
