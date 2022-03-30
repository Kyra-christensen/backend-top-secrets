const { Router } = require('express');
const User = require('../models/User');
const UserService = require('../services/UserService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  })

  .post('/sessions', async (req, res, next) => {
    try {
      const user = await UserService.signin(req.body);
      res
        .cookie(process.env.COOKIE_NAME, user.authToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24
        })
        .send({ message: 'You signed in successfully', user });
    } catch (error) {
      next(error);
    }
  });
