"use strict";
const passwordHash = require("password-hash");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    for (let i = 0; i < 5; i++) {
      users.push({
        username: `users${i}`,
        email: `user${i}@gmail.com`,
        password: passwordHash.generate(`user${i}`),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("Users", users, {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {
      truncate: true,
    });
  },
};
