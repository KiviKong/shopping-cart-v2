const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const API = require('../helpers/api');
const validate = require('../helpers/validate');

const errorCodes = require('../../../config/error-codes');

const sessionFixtures = require('../fixtures/sessions/session');
const errorSchema = require('../schemas/error');

chai.use(chaiAsPromised);

describe('functional/Sessions controller', () => {

  describe('login', () => {

    it('should return an error if the email is not present', () => {
      const data = sessionFixtures.withoutField('email');

      return API.login(data)
        .should.be.rejected
        .then(response => {

          const { error } = response.response;

          response.status.should.be.eql(400);
          return error.path.should.be.eql('/api/v1/graphql');
        });
    });

    it('should return an error if the email is empty', () => {
      const data = sessionFixtures.emptyField('email');

      return API.login(data)
        .should.be.fulfilled
        .then(response => {

          const errorData = response.data.errors[0];

          response.status.should.be.eql(200);
          errorData.path.should.be.eql('email');
          errorData.code.should.be.eql(errorCodes.Server.InvalidRequest);
          return validate(errorSchema)(errorData);
        });
    });

    it('should return an error if the email has an invalid format', () => {
      const data = sessionFixtures.invalidFormat();

      return API.login(data)
        .should.be.fulfilled
        .then(response => {

          const errorData = response.data.errors[0];

          response.status.should.be.eql(200);
          errorData.path.should.be.eql('email');
          errorData.code.should.be.eql(errorCodes.Server.InvalidRequest);
          return validate(errorSchema)(errorData);
        });
    });

    it('should return an error if the password is not present', () => {
      const data = sessionFixtures.withoutField('password');

      return API.login(data)
        .should.be.rejected
        .then(response => {

          const { error } = response.response;

          response.status.should.be.eql(400);
          return error.path.should.be.eql('/api/v1/graphql');
        });
    });

    it('should return an error if the password is empty', () => {
      const data = sessionFixtures.emptyField('password');

      return API.login(data)
        .should.be.fulfilled
        .then(response => {

          const errorData = response.data.errors[0];

          response.status.should.be.eql(200);
          errorData.path.should.be.eql('password');
          errorData.code.should.be.eql(errorCodes.Server.InvalidRequest);
          return validate(errorSchema)(errorData);
        });
    });

    it('should return an error if the password is less than 8 characters', () => {
      const data = sessionFixtures.shortPassword();

      return API.login(data)
        .should.be.fulfilled
        .then(response => {

          const errorData = response.data.errors[0];

          response.status.should.be.eql(200);
          errorData.path.should.be.eql('password');
          errorData.code.should.be.eql(errorCodes.Server.InvalidRequest);
          return validate(errorSchema)(errorData);
        });
    });

    it('should return an error if the email does not exists', () => {
      const data = sessionFixtures.wrongEmail();

      return API.login(data)
        .should.be.fulfilled
        .then(response => {

          const errorData = response.data.errors[0];

          response.status.should.be.eql(200);
          errorData.path.should.be.eql('email or password');
          errorData.code.should.be.eql(errorCodes.Session['email or password doesn\'t match']);
          return validate(errorSchema)(errorData);
        });
    });

    it('should return an error if the password does not match', () => {
      const data = sessionFixtures.wrongPassword();

      return API.login(data)
        .should.be.fulfilled
        .then(response => {

          const errorData = response.data.errors[0];

          response.status.should.be.eql(200);
          errorData.path.should.be.eql('email or password');
          errorData.code.should.be.eql(errorCodes.Session['email or password doesn\'t match']);
          return validate(errorSchema)(errorData);
        });
    });

    it('should a success if user and password are correct', () => {
      const sessionSchema = require('../schemas/session');
      const data = sessionFixtures.adminCredentials();

      return API.login(data)
        .should.be.fulfilled
        .then(response => {

          const { login } = response.data.data;

          response.status.should.be.eql(200);
          return validate(sessionSchema)(login);
        })
        .then(() => API.logout());
    });
  });

  describe('logout', () => {

    it('should return an error if user is not logged in', () => {
      return API.logout()
        .should.be.fulfilled
        .then(response => {

          const errorData = response.data.errors[0];

          response.status.should.be.eql(200);
          errorData.path.should.be.eql('user');
          errorData.code.should.be.eql(errorCodes.Session.Unauthorized);
          return validate(errorSchema)(errorData);
        });
    });

    it('should success if user is logged in', () => {
      const logoutSchema = require('../schemas/logout');

      return API.adminLogin()
        .then(() => API.logout())
        .should.be.fulfilled
        .then(response => {

          const { logout } = response.data.data;

          response.status.should.be.eql(200);
          return validate(logoutSchema)(logout);
        });
    });
  });

  describe('me', () => {

    beforeEach(() => {
      if (!API.isLoggedIn()) {
        return API.adminLogin();
      }

      return Promise.resolve();
    });

    it('should return an error if user is not logged in', () => {

      return API.logout()
        .then(() => API.me())
        .should.be.fulfilled
        .then(response => {

          const errorData = response.data.errors[0];

          response.status.should.be.eql(200);
          errorData.path.should.be.eql('user');
          errorData.code.should.be.eql(errorCodes.Session.Unauthorized);
          return validate(errorSchema)(errorData);
        });
    });

    it('should success if user is logged in', () => {
      const sessionSchema = require('../schemas/session');

      return API.me()
        .should.be.fulfilled
        .then(response => {

          const { me } = response.data.data;

          response.status.should.be.eql(200);
          return validate(sessionSchema)(me);
        });
    });
  });
});
