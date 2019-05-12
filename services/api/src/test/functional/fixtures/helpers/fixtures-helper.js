const _ = require('lodash');

class FixtureHelper {
  constructor(data = {}) {
    this.data = data;
  }

  withoutField(field) {
    const data = _.cloneDeep(this.data);

    delete data[field];

    return data;
  }

  emptyField(field) {
    const data = _.cloneDeep(this.data);

    return _.set(data, field, '');
  }

  zeroValueFiled(field) {
    const data = _.cloneDeep(this.data);

    return _.set(data, field, 0);
  }

  enumNotValid(field) {
    const data = _.cloneDeep(this.data);

    return _.set(data, field, 'NOT VALID');
  }
}

module.exports = FixtureHelper;
