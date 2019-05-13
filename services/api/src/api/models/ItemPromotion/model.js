const Sequelize = require('sequelize');
const ItemPromotion = {
  attributes: {
    itemId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'item_id'
    },
    promotionId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'promotion_id'
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
  },
  options: {
    tableName: 'items_promotions',
    underscored: true,
    paranoid: true,
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.Item, {
          targetKey: 'id',
          foreignKey: 'item_id',
          as: 'Item'
        });
        this.belongsTo(models.Promotion, {
          foreignKey: 'promotion_id',
          targetKey: 'id',
          as: 'Promotion'
        });
      }
    }
  }
};

module.exports = ItemPromotion;
