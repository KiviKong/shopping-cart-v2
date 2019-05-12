const Sequelize = require('sequelize');

const SessionModel = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    token: {
      type: Sequelize.STRING
    },
    expirationDate: {
      type: Sequelize.DATE,
      field: 'expiration_date'
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      field: 'user_id',
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
    tableName: 'sessions',
    underscored: true,
    paranoid: false,
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.User);
      }
    }
  }
};

module.exports = SessionModel;
