'use strict';

module.exports = {
  up: async(queryInterface) => {
    return queryInterface.bulkInsert('users', [ {
      'name': 'Admin staging',
      'email': 'adminStaging@email.com',
      'password': '$2a$10$1mmenGwzVuEaccaauCC70OCqAuqziEWzmLBbNZDT/.qYkyXRHzaQ2',
      'role': 'ADMIN',
      'verified': true
    } ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
