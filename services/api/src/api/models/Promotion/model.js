const Sequelize = require('sequelize');
const PromotionModel = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    code: {
      type: Sequelize.STRING,
      unique: true
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
    tableName: 'promotions',
    underscored: true,
    paranoid: true,
    classMethods: {
      associate: function(models) {
        this.belongsToMany(models.Item, {
          targetKey: 'id',
          as: 'Item',
          through: 'items_promotions'
        });
      }
    }
  }
};

module.exports = PromotionModel;
