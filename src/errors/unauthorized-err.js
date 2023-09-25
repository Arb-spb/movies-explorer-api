const http2 = require('http2');

class UnauthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = http2.constants.HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedErr;
