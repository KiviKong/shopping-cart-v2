class SessionFactory {

  formatCredential(email, password) {
    return {
      email,
      password
    };
  }
}

module.exports = new SessionFactory();
