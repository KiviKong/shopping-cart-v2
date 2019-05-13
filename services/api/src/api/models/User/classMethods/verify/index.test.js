const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const bcrypt = require('bcryptjs');
const { User } = require(process.env.MODELS_PATH);
const ErrorValidator = require('/var/lib/core/js/error-validator');
const optionsModel = User.options;

describe('models/User/classMethods verify', () => {

  const { classMethods } = optionsModel;
  const fixtures = require('./fixtures');
  const { user, email, password, compareParams, userQuery, commonError } = fixtures;
  const errorValidator = new ErrorValidator(classMethods.verify);

  beforeEach(() => {
    sandbox.stub(User, 'findOne').resolves(user);
    sandbox.stub(bcrypt, 'compare').resolves(true);
  });


  afterEach(() => {
    sandbox.restore();
  });

  it('should return error if User.findOne has an error', async() => {
    User.findOne.restore();
    sandbox.stub(User, 'findOne').throws(commonError);

    await errorValidator.shouldFailWith(commonError, email, password);

    User.findOne.calledOnce.should.be.true;
    User.findOne.args[0].should.be.eql(userQuery);
    bcrypt.compare.called.should.be.false;
  });

  it('should return error response if the user does not exists', async() => {
    User.findOne.restore();
    sandbox.stub(User, 'findOne').resolves();

    await errorValidator.shouldBeUndefined(email, password);

    User.findOne.calledOnce.should.be.true;
    User.findOne.args[0].should.be.eql(userQuery);
    bcrypt.compare.called.should.be.false;
  });

  it('should return error if bcrypt has an error', async() => {
    bcrypt.compare.restore();
    sandbox.stub(bcrypt, 'compare').throws(commonError);

    await errorValidator.shouldFailWith(commonError, email, password);

    User.findOne.calledOnce.should.be.true;
    User.findOne.args[0].should.be.eql(userQuery);
    bcrypt.compare.calledOnce.should.be.true;
    bcrypt.compare.args[0].should.be.eql(compareParams);
  });

  it('should return error if the password is no t the same with the one stored in the db', async() => {
    bcrypt.compare.restore();
    sandbox.stub(bcrypt, 'compare').resolves(false);

    await errorValidator.shouldBeUndefined(email, password);

    User.findOne.calledOnce.should.be.true;
    User.findOne.args[0].should.be.eql(userQuery);
    bcrypt.compare.calledOnce.should.be.true;
    bcrypt.compare.args[0].should.be.eql(compareParams);
  });

  it('should return user if ther was no issue verifying it', async() => {

    const result = await classMethods.verify(email, password);

    User.findOne.calledOnce.should.be.true;
    User.findOne.args[0].should.be.eql(userQuery);
    bcrypt.compare.calledOnce.should.be.true;
    bcrypt.compare.args[0].should.be.eql(compareParams);
    result.should.be.eql(user);
  });
});
