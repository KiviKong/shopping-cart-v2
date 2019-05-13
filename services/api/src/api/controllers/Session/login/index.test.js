const chai = require('chai');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const login = require('./');

const ErrorValidator = require('/var/lib/core/js/error-validator');
const errorValidator = new ErrorValidator(login);

const { Session } = require(process.env.MODELS_PATH);

chai.should();
chai.use(require('chai-as-promised'));

describe('controllers/Session/login', () => {
  const {
    context, args, verifyAndCreateParams, sessionInstance, response, error, user
  } = require('./fixtures');

  beforeEach(() => {
    sandbox.stub(Session, 'verifyAndCreate').resolves(sessionInstance);
    sandbox.stub(sessionInstance.User, 'getRaw').resolves(user);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return an error if Session.verifyAndCreate return a reject', async() => {
    Session.verifyAndCreate.restore();
    sandbox.stub(Session, 'verifyAndCreate').throws(error);

    await errorValidator.shouldFailWith(error, null, args, context);

    Session.verifyAndCreate.calledOnce.should.be.true;
    Session.verifyAndCreate.args[0].should.eql(verifyAndCreateParams);
  });

  it('should return a success if there was no issue', async() => {
    const result = await login(null, args, context);

    Session.verifyAndCreate.calledOnce.should.be.true;
    Session.verifyAndCreate.args[0].should.eql(verifyAndCreateParams);

    result.should.be.eql(response);
  });
});
