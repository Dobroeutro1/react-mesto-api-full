const usersRouter = require('express').Router();
const {
  getUsers, getUsersId, createUser, updateAvatar, updateProfile, login
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUsersId);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
