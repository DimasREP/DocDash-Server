'use strict';
const passwordHash = require('password-hash');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
      users.push({
        username: `admin`,
        email: `admin@gmail.com`,
        password: passwordHash.generate(`12345`),
        role:`admin`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      users.push({
        username: `user`,
        email: `user@gmail.com`,
        password: passwordHash.generate(`12345`),
        role:`user`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    
    return queryInterface.bulkInsert('Users', users, {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {
      truncate: true
    });
  }
};