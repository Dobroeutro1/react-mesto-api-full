/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const CastError = require('../errors/cast-err');
const ValidationError = require('../errors/validation-err');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(
      (err) => {
        err.statusCode = 500;
        next(err);
      },
      // res.status(500).send({ message: "Нет пользователя с таким id" })
    );
};

const getUser = (req, res) => {
  const { _id } = req.user;
  User.findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }

      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Передан не валидный id');
      }
      err.statusCode = 500;
      next(err);
      // return res.status(500).send({ message: "На сервере произошла ошибка" });
    });
};

const getUsersId = (req, res) => {
  const { _id } = req.params;
  User.findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }

      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Передан не валидный id');
      }
      err.statusCode = 500;
      next(err);
      // return res.status(500).send({ message: "Нет пользователя с таким id" });
    });
};

// {
//   email: user.email, name: user.name, about: user.about, avatar: user.avatar,
// }

const createUser = async (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt
    .hash(password, 8)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.send({
      email: user.email, name: user.name, about: user.about, avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Проверьте правильность введеных данных');
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return err.statusCode('409').send({ message: 'Такой email уже зарегистрирован' });
      }
      err.statusCode = 500;
      next(err);
      // return res
      //   .status(500)
      //   .send({ message: "Произошла ошибка при отправке данных" });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Проверьте правильность введеных данных');
      }
      if (err.name === 'CastError') {
        throw new CastError('Передан не валидный id');
      }
      err.statusCode = 500;
      next(err);
      // return res
      //   .status(500)
      //   .send({ message: "Произошла ошибка при отправке данных" });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Проверьте правильность введеных данных');
      }
      if (err.name === 'CastError') {
        throw new CastError('Передан не валидный id');
      }
      err.statusCode = 500;
      next(err);
      // return res
      //   .status(500)
      //   .send({ message: "Произошла ошибка при отправке данных" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch((err) => {
      err.status = 401;
      next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  getUsersId,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
