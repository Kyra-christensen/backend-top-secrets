const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const cookie = req.cookies[process.COOKIE_NAME];

    if(!cookie) throw new Error('You must be signed in');

    const payload = jwt.verify(cookie, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } catch (err) {
    err.status = 401;

    next(err);
  }
};
