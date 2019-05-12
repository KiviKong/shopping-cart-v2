const chai = require('chai');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const bcrypt = require('bcryptjs');
const { User } = require('../../../../models');
const optionsModel = User.options;

chai.should();
chai.use(require('chai-as-promised'));

describe('models/User/hooks beforeCreate', () => {

  const { hooks } = optionsModel;
  const fixtures = require('./fixtures');
  const { instance, salt, genSaltParams, hash, hashSyncParams } = fixtures;

  beforeEach(() => {
    sandbox.stub(bcrypt, 'genSaltSync').callsFake(() => salt);
    sandbox.stub(bcrypt, 'hashSync').callsFake(() => hash);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return a successful response', async() => {
    const oldPassword = instance.password;
    const result = await hooks.beforeCreate[0](instance);

    result.password.should.be.not.equal(oldPassword);
    bcrypt.genSaltSync.calledOnce.should.be.true;
    bcrypt.genSaltSync.args[0].should.be.eql(genSaltParams);
    bcrypt.hashSync.calledOnce.should.be.true;
    return bcrypt.hashSync.args[0].should.be.eql(hashSyncParams);
  });
});
