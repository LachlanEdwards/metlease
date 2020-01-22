module.exports = {
  Forbidden: {
    status_code: 403,
    name: 'Forbidden',
    description: 'The server understood the request but refuses to authorize it.'
  },
  Unauthorized: {
    status_code: 401,
    name: 'Unauthorized',
    description: 'The request has not been applied because it lacks valid authentication credentials for the target resource.'
  },
  Accepted: {
    status_code: 202,
    name: 'Accepted',
    description: 'The request has been received but not yet acted upon.'
  }
}
