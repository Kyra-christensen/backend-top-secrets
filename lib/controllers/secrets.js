const { Router } = require('express');
const Secret = require('../models/Secret');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      res.send(await Secret.create(req.body));
    } catch (error) {
      next(error);
    }
  });
