const superagent = require('superagent-defaults')();
const sessionFixtures = require('../fixtures/sessions/session');
const sessionFactory = require('./factories/session');

class Api {
  constructor(host = 'http://localhost:3000', prefix = '/api/') {
    this.client = superagent.set('Content-type', 'application/json')
      .timeout({ response: 5000 });
    this.baseUrl = host + prefix;
    this.loggedIn = false;
  }

  request(method, url, data = {}, query = {}) {

    const client = this.client;
    const baseUrl = this.baseUrl;

    return new Promise(function(resolve, reject) {

      client[method](baseUrl + url).query(query).send(data)
        .end(function(err, result) {
          if (err) {
            return reject(err);
          }

          const response = {
            status: result.status,
            data: result.body
          };

          return resolve(response);
        });
    });
  }

  requestWithTimeout(method, url, data = {}, query = {}, timeout = 5000) {

    const client = this.client;
    const baseUrl = this.baseUrl;

    return new Promise(function(resolve, reject) {

      client[method](baseUrl + url)
        .timeout({ response: timeout })
        .query(query).send(data)
        .end(function(err, result) {
          if (err) {
            return reject(err);
          }

          const response = {
            status: result.status,
            data: result.body
          };

          return resolve(response);
        });
    });
  }

  requestWithFile(method, url, file, data = {}) {

    const client = this.client;
    const baseUrl = this.baseUrl;

    return new Promise(function(resolve, reject) {

      const request = client[method](baseUrl + url).attach('files', file);

      Object.keys(data).forEach(key => data[key] && request.field(key, data[key]));

      request
        .timeout({ response: 15000 })
        .end(function(err, result) {
          if (err) {
            return reject(err);
          }

          // Quickfix to follow prevoius agent structure
          const response = {
            status: result.status,
            data: result.body
          };

          return resolve(response);
        });
    });
  }

  graphqlRequestWithFile(file, data) {

    return this.requestWithFile('post', 'v1/graphql', file, data);
  }

  setToken(token) {
    this.client.set('Authorization', `Bearer ${token}`);
  }

  setFakeToken(token) {

    return Promise.resolve()
      .then(() => {

        this.client.set('Authorization', `Bearer ${token}`);
        this.loggedIn = false;
      });
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  graphqlRequest(data) {
    return this.request('post', 'v1/graphql', data);
  }

  adminLogin() {
    const credentials = sessionFixtures.adminCredentials();

    return this.login(credentials);
  }

  professionistLogin() {
    const credentials = sessionFixtures.professionistCredentials();

    return this.login(credentials);
  }

  login(params) {
    const query = sessionFactory.login(params);

    return this.graphqlRequest(query)
      .then(response => {
        if (response.data.data.login) {

          this.setToken(response.data.data.login.token);
          this.loggedIn = true;
        }

        return response;
      });
  }

  logout() {
    const query = sessionFactory.logout();

    return this.graphqlRequest(query)
      .then(response => {
        this.loggedIn = false;

        return response;
      });
  }

  me() {
    const query = sessionFactory.me();

    return this.graphqlRequest(query);
  }
}

module.exports = new Api();
