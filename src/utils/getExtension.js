const getExtension = (filename) => {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }

module.exports = getExtension