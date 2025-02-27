const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token', err.mesage);
    }
    return req;
  },

  signToken: function ({ email, username, _id, isAdmin }) {
    const payload = { email, username, _id, isAdmin };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

};
