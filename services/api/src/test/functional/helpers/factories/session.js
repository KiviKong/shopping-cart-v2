const formatHelper = require('../formatHelpers');

class SessionFactory {
  login(params) {
    const { email, password } = params;
    const login = {
      email: formatHelper.formatStringValue(email, 'email'),
      password: formatHelper.formatStringValue(password, 'password')
    };

    return {
      query: `
        mutation {
          login(input: {
            ${login.email}
            ${login.password}
          }) {
            token,
            expirationDate,
            user {
              id,
              email
              role,
            }
          }
        }
      `
    };
  }

  logout() {
    return {
      query: `
        mutation {
          logout {
            success
          }
        }
      `
    };
  }

  me() {
    return {
      query: `
        query{
          me{
            token
            expirationDate
            user {
              id
              email
              role
            }
          }
        }
      `
    };
  }
}

module.exports = new SessionFactory();
