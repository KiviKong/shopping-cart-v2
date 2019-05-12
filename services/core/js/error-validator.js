class ErrorValidator {
  constructor(method, context) {
    this.method = context ? method.bind(context) : method;
  }

  async shouldFailWith(expectedError, ...args) {
    let err = false;

    try {
      await this.method.apply(null, args);
    } catch (e) {
      err = e;
    }

    return err.should.be.eql(expectedError);
  }

  async shouldBeUndefined(...args) {
    const expect = require('/var/lib/app/node_modules/chai').expect;
    let err = false;

    try {
      await this.method.apply(null, args);
    } catch (e) {
      err = e;
    }

    return expect(err).to.be.undefined;
  }
}

module.exports = ErrorValidator;
