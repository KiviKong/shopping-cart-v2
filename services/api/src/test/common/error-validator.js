class ErrorValidator {
  constructor(method) {
    this.method = method;
  }

  async shouldFailWith(root, args, context, expectedError) {
    let err = false;

    try {
      await this.method(root, args, context);
    } catch (e) {
      err = e;
    }

    return err.should.be.eql(expectedError);
  }
}

module.exports = ErrorValidator;
