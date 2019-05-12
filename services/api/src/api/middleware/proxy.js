const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const { validate } = require('../middleware/validator');
const errorHelper = require('../helpers/error');
const logger = new (require('/var/lib/core/js/log'))(module);

class Proxy {
  constructor(controller) {
    this.controllerName = controller;
    this.controller = require(`../controllers/${controller}`);
    this.log = logger;

    const methods = Object.keys(this.controller);

    methods.forEach(method => this._chainable(method));
  }

  _chainable(method) {
    this[method] = async(...args) => {
      await Promise.all(this[method].chain.map(s => s(...args)));
      return this._decoratedMethod(this.controller[method])(...args);
    };

    this[method].chain = [];

    this[method].authenticated = () => {
      this[method].chain.push(this._authenticated);
      return this[method];
    };

    this[method].authorized = () => {
      this[method].chain.push(this._authorized(method));
      return this[method];
    };

    this[method].validInput = (schema) => {
      this[method].chain.push(this._validInput(schema));
      return this[method];
    };
  }

  _decoratedMethod(fn) {
    const logMessage = `${this.controllerName}.${fn.name}`;

    return async(root, args, context) => {
      try {
        this.log.message(logMessage, args.input, 'request', context.guid);

        const response = await fn(root, args, context);

        this.log.message(logMessage, response, 'response', context.guid);

        return response;
      } catch (e) {
        return errorHelper.handleResponse(this.controllerName, e, context.guid);
      }
    };
  }

  _authenticated(root, args, context) {
    return authentication(context);
  }

  _authorized(method) {
    return (root, args, context) => authentication(context).then(() => authorization.validate(method, context));
  }

  _validInput(schemaName) {
    const schema = require(`../schemas/${schemaName}`);

    return (root, args, context) => {
      return validate(schema, context)(args.input);
    };
  }
}

module.exports = Proxy;
