const _ = require('lodash');
const userFixtures = require('/var/lib/core/integration_fixtures/user');
const sessionFactory = require('../../factories/session');

const FixturesHelper = require('../helpers/fixtures-helper');

const adminUser = _.find(userFixtures, { email: 'admin@email.com' });
const professionistUser = _.find(userFixtures, { email: 'professionist@email.com' });

class SessionFixtures extends FixturesHelper {
  constructor() {
    const { email, password } = adminUser;
    const data = sessionFactory.formatCredential(email, password);

    super(data);
  }

  adminCredentials() {
    const { email, password } = adminUser;

    return sessionFactory.formatCredential(email, password);
  }

  professionistCredentials() {
    const { email, password } = professionistUser;

    return sessionFactory.formatCredential(email, password);
  }

  wrongEmail() {
    const { password } = adminUser;

    return sessionFactory.formatCredential('wrong_email@contpaq.com', password);
  }

  invalidFormat() {
    const { password } = adminUser;

    return sessionFactory.formatCredential('wrongemail.com', password);
  }

  wrongPassword() {
    const { email } = adminUser;

    return sessionFactory.formatCredential(email, 'wrongpassword');
  }

  shortPassword() {
    const { email } = adminUser;

    return sessionFactory.formatCredential(email, '12345');
  }

  fakeToken() {
    return 'fake token';
  }
}

module.exports = new SessionFixtures();
