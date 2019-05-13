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

    let json = JSON.stringify(values);

    json.replace(/\\"/g, '\uFFFF');
    json = json.replace(/\"([^"]+)\":/g, '$1:').replace(/\uFFFF/g, '\\\"');

    return `${parameterName}: ${json},`;
  }
}

module.exports = new FormatHelper();
