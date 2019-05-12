class FormatHelper {
  formatStringValue(value, parameterName) {
    if (value === undefined) {
      return '';
    }
    return `${parameterName}: "${value}",`;
  }

  formatNumericValue(value, parameterName) {
    if (value === undefined) {
      return '';
    }
    return `${parameterName}: ${value},`;
  }

  formatObjectValue(values, parameterName) {
    if (values === undefined) {
      return '';
    }
    return `${parameterName} { ${values.join(' ')} },`;
  }

  formatArrayValue(values, parameterName) {
    if (values === undefined) {
      return '';
    }

    if (!values.length) {
      return `${parameterName}: [],`;
    }

    return `${parameterName}: ${JSON.stringify(values)},`;
  }
}

module.exports = new FormatHelper();
