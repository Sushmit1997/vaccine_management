
const getExtension = require('./getExtension')

const isImage = (filename) => {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
      case 'jpeg':
        //etc
        return true;
    }
    return false;
  }


module.exports = isImage