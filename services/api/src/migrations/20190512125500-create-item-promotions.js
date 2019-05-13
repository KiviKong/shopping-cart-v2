'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'items_promotions',
      {
        itemId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          field: 'item_id',
          references: {
            model: 'items',
            key: 'id'
          }
        },
        promotionId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          field: 'promotion_id',
          references: {
            model: 'promotions',
            key: 'id'
          }
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at'
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at'
        },
        deletedAt: {
          type: Sequelize.DATE,
          field: 'deleted_at'
        }
      }
    );
  },

  down: function(queryInterface) {
    return queryInterface.dropTable('items_promotions');
  }
};
