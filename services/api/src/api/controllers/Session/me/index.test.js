const chai = require('chai');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const me = require('./');

const ErrorValidator = require('/var/lib/core/js/error-validator');
const errorValidator = new ErrorValidator(me);

const { Session } = require('../../../models');

chai.should();
chai.use(require('chai-as-promised'));

describe('controllers/Session/me', () => {
  const {
      context,
      args,
      sessionInstance,
      response,
      error,
      findOneParams,
      user
    } = require('./fixtures');

  beforeEach(() => {
    sandbox.stub(Session, 'findOne').resolves(sessionInstance);
    sandbox.stub(sessionInstance.User, 'getRaw').returns(user);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return an error if Session.findOne return a reject', async() => {
    Session.findOne.restore();
    sandbox.stub(Session, 'findOne').throws(error);

    await errorValidator.shouldFailWith(error, null, args, context);

    Session.findOne.calledOnce.should.be.true;
    Session.findOne.args[0].should.eql(findOneParams);
  });

  it('should return a success if there was no issue', async() => {
    const result = await me(null, args, context);

    Session.findOne.calledOnce.should.be.true;
    Session.findOne.args[0].should.eql(findOneParams);

    result.should.be.eql(response);
  });
});
