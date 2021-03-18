const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Такой email уже зарегистрирован!',
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 9
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: 'Жак-Ив Кусто'
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: 'Исследователь'
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Введите правильную ссылку!',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  },
});

module.exports = mongoose.model('user', userSchema);
