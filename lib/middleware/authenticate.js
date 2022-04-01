const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];

    if(!cookie) throw new Error('You must be signed in');
    console.log('*****cookie*****', cookie);
    const payload = jwt.verify(cookie, process.env.JWT_SECRET);
    
    req.user = payload;

    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
