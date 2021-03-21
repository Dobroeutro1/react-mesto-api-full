/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundError = require("../errors/not-found-err");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() =>
      res.status(500).send({ message: "Нет пользователя с таким id" })
    );
};

const getUser = (req, res) => {
  const { id } = req.body;
  User.findOne({ id })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Нет пользователя с таким id" });
      }

      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Передан не валидный id" });
      }
      return res.status(500).send({ message: "Нет пользователя с таким id" });
    });
};

const createUser = (req, res) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt
    .hash(password, 8)
    .then((hash) => User.create({ email, hash, name, about, avatar }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Проверьте правильность введеных данных" });
      }
      return res
        .status(500)
        .send({ message: "Произошла ошибка при отправке данных" });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Проверьте правильность введеных данных" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Передан не валидный id" });
      }
      return res
        .status(500)
        .send({ message: "Произошла ошибка при отправке данных" });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Проверьте правильность введеных данных" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Передан не валидный id" });
      }
      return res
        .status(500)
        .send({ message: "Произошла ошибка при отправке данных" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
