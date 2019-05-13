const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const { Session, User } = require(process.env.MODELS_PATH);
const ErrorValidator = require('/var/lib/core/js/error-validator');
const optionsModel = Session.options;

describe('models/Session/classMethods verifyAndCreate', () => {
  const { classMethods } = optionsModel;
  const fixtures = require('./fixtures');
  const { email, password, verifyParams, userInstance, createParams,
    sessionInstance, response, commonError, notVerifiedError, wrongDataError } = fixtures;
  const errorValidator = new ErrorValidator(classMethods.verifyAndCreate);

  beforeEach(() => {
    sandbox.stub(User, 'verify').resolves(userInstance);
    sandbox.stub(Session, 'create').resolves(sessionInstance);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return an error if there was an issue with User.verify', async() => {
    User.verify.restore();
    sandbox.stub(User, 'verify').rejects(wrongDataError);

    await errorValidator.shouldFailWith(wrongDataError, email, password);

    User.verify.calledOnce.should.be.true;
    User.verify.args[0].should.be.eql(verifyParams);
    Session.create.called.should.be.false;
  });

  it('should return an error if User.verify returns a not verified user', async() => {
    User.verify.restore();
    sandbox.stub(User, 'verify').throws(notVerifiedError);

    await errorValidator.shouldFailWith(notVerifiedError, email, password);

    User.verify.calledOnce.should.be.true;
    User.verify.args[0].should.be.eql(verifyParams);
    Session.create.called.should.be.false;
  });

  it('should return an error if there was an issue with Session.create', async() => {
    Session.create.restore();
    sandbox.stub(Session, 'create').throws(commonError);

    await errorValidator.shouldFailWith(commonError, email, password);

    User.verify.calledOnce.should.be.true;
    User.verify.args[0].should.be.eql(verifyParams);
    Session.create.calledOnce.should.be.true;
    Session.create.args[0].should.be.eql(createParams);
  });

  it('should return a success if there was no issue', async() => {

    const result = await classMethods.verifyAndCreate(email, password);

    User.verify.calledOnce.should.be.true;
    User.verify.args[0].should.be.eql(verifyParams);
    Session.create.calledOnce.should.be.true;
    Session.create.args[0].should.be.eql(createParams);

    result.should.be.eql(response);
  });
});
