const app = require('../app');

after(() => Promise.all([ app.shutdown() ]));
