const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const _         = require('lodash');
const config    = require(path.join(__dirname, './../../config/config'));
const db        = {};
let sequelize = {};

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(directory => !directory.includes('.js'))
  .forEach((file) => {
    const modelDescription = require('./' + file + '/model');
    const modelFunctions = require('./' + file);
    const modelDefinition = _.merge({}, modelDescription, modelFunctions);
    const model = sequelize.define(file.replace('.js', ''), modelDefinition.attributes, modelDefinition.options);

    const classMethods = _.merge({}, modelDescription.options.classMethods, modelFunctions.options.classMethods);
    // eslint-disable-next-line max-len
    const instanceMethods = _.merge({}, modelDescription.options.instanceMethods, modelFunctions.options.instanceMethods);

    _.forEach(classMethods, (value, index) => {
      model[index] = value;
    });
    _.forEach(instanceMethods, (value, index) => {
      model.prototype[index] = value;
    });

    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
