const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const ErrorValidator = require('/var/lib/core/js/error-validator');
const { Session } = require(process.env.MODELS_PATH);
const optionsModel = Session.options;

describe('models/Session/classMethods/checkToken', () => {
  const { classMethods } = optionsModel;
  const errorValidator = new ErrorValidator(classMethods.checkToken);

  const {
    token,
    findOneParams,
    validSession,
    invalidSession,
    commonError,
    expiredError
  } = require('./fixtures');

  beforeEach(() => {
    sandbox.stub(Session, 'findOne').resolves(validSession);
    sandbox.stub(validSession, 'save').resolves();
    sandbox.stub(validSession, 'defineExpiration').callsFake(() => 10);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return error if findOne return an error', async() => {
    Session.findOne.restore();
    sandbox.stub(Session, 'findOne').throws(commonError);

    await errorValidator.shouldFailWith(commonError, token);

    Session.findOne.calledOnce.should.be.true;
    Session.findOne.args[0].should.be.eql(findOneParams);
    validSession.save.called.should.be.false;
  });

  it('should return error if session does not exists', async() => {
    Session.findOne.restore();
    sandbox.stub(Session, 'findOne').resolves();

    await errorValidator.shouldFailWith(expiredError, token);

    Session.findOne.calledOnce.should.be.true;
    Session.findOne.args[0].should.be.eql(findOneParams);
    validSession.save.called.should.be.false;
  });

  it('should return error if session was expired', async() => {
    Session.findOne.restore();
    sandbox.stub(Session, 'findOne').resolves(invalidSession);

    await errorValidator.shouldFailWith(expiredError, token);

    Session.findOne.calledOnce.should.be.true;
    Session.findOne.args[0].should.be.eql(findOneParams);
    validSession.save.called.should.be.false;
  });

  it('should return a successful response', async() => {
    await classMethods.checkToken(token);

    Session.findOne.calledOnce.should.be.true;
    Session.findOne.args[0].should.be.eql(findOneParams);
    validSession.save.calledOnce.should.be.true;
  });
});
