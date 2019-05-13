const { User } = require(process.env.MODELS_PATH);
const optionsModel = User.options;

describe('models/User/instanceMethods getRaw', () => {

  const { instanceMethods } = optionsModel;
  const fixtures = require('./fixtures');
  const { user, userWithoutRole, response, responseWithoutRole } = fixtures;

  it('should return a succes with role', async() => {

    const result = await instanceMethods.getRaw.call(user);

    result.should.be.eql(response);
  });

  it('should return a succes without role', async() => {

    const result = await instanceMethods.getRaw.call(userWithoutRole);

    result.should.be.eql(responseWithoutRole);
  });
});
