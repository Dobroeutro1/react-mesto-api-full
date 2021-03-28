/* eslint-disable no-unused-vars */
const router = require('express').Router();
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const NotFoundError = require('../errors/not-found-err');

router.use('/', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
