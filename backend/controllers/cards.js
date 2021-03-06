/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const CastError = require('../errors/cast-err');
const ValidationError = require('../errors/validation-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(
      (err) => {
        err.statusCode = 500;
        next(err);
      },
      // res.status(500).send({ message: "На сервере произошла ошибка" })
    );
};

const addCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id; // _id станет доступен
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Проверьте правильность введеных данных', next);
      }
      err.statusCode = 500;
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует', next);
      }

      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Нет карточки с таким id', next);
      }
      err.statusCode = 500;
      next(err);
    });
};

const addLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует', next);
      }

      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Нет карточки с таким id', next);
      }
      err.statusCode = 500;
      next(err);
      // return res.status(500).send({ message: "На сервере произошла ошибка" });
    });
};

const deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует', next);
      }

      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Нет карточки с таким id', next);
      }
      err.statusCode = 500;
      next(err);
    });
};

module.exports = {
  getCards,
  addCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
};
