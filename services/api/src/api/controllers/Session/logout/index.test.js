const chai = require('chai');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const logout = require('./');

const ErrorValidator = require('/var/lib/core/js/error-validator');
const errorValidator = new ErrorValidator(logout);

const { Session } = require('../../../models');

chai.should();
chai.use(require('chai-as-promised'));

describe('controllers/Session/logout', () => {
  const {
      context,
      args,
      destroyParams,
      response,
      error
    } = require('./fixtures');

  beforeEach(() => {
    sandbox.stub(Session, 'destroy').resolves();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return an error if Session.destroy return a reject', async() => {
    Session.destroy.restore();
    sandbox.stub(Session, 'destroy').throws(error);

    await errorValidator.shouldFailWith(error, null, args, context);

    Session.destroy.calledOnce.should.be.true;
    Session.destroy.args[0].should.eql(destroyParams);
  });

  it('should return a success if there was no issue', async() => {
    const result = await logout(null, args, context);

    Session.destroy.calledOnce.should.be.true;
    Session.destroy.args[0].should.eql(destroyParams);

    result.should.be.eql(response);
  });
});
