const http2 = require('http2');

class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = http2.constants.HTTP_STATUS_FORBIDDEN;
  }
}

module.exports = ForbiddenErr;
