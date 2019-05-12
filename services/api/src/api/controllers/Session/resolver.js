const proxy = new (require('../../middleware/proxy'))('Session');

const resolver = {
  Mutation: {
    login: proxy.login.validInput('session/login'),
    logout: proxy.logout.authenticated()
  },
  Query: {
    me: proxy.me.authenticated()
  }
};

module.exports = resolver;
