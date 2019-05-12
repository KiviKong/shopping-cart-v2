const Sequelize = require('sequelize');
const ItemModel = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    code: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
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
    tableName: 'items',
    underscored: true,
    paranoid: true,
    classMethods: {
      associate: function(models) {
        this.belongsToMany(models.Promotion, {
          targetKey: 'id',
          as: 'Promotion',
          through: 'items_promotions'
        });
      }
    }
  }
};

module.exports = ItemModel;
