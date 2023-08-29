const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err.name} ${err.message}` });
    });
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFoundError'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан некорректный _id пользователя' });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err.name} ${err.message}` });
    });
};

module.exports.findUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name} ${err.message}` }));
};

module.exports.changeUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotFoundError'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан некорректный _id пользователя' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err.name} ${err.message}` });
    });
};

module.exports.changeUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotFoundError'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан некорректный _id пользователя' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err.name} ${err.message}` });
    });
};
