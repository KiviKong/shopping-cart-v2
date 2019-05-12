const Sequelize = require('sequelize');
const userRoles = require('/var/lib/core/js/user-roles');

const UserModel = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      },
      unique: true
    },
    role: {
      type: Sequelize.STRING,
      validate: {
        isIn: [ Object.values(userRoles) ]
      }
    },
    password: {
      type: Sequelize.STRING
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
    tableName: 'users',
    underscored: true,
    paranoid: true,
    classMethods: {
      associate: function(models) {
        this.hasMany(models.Session, {
          foreignKey: 'user_id',
          targetKey: 'id',
          as: 'Session'
        });
      }
    }
  }
};

module.exports = UserModel;
