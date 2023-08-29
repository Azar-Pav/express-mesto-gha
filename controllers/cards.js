const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан некорректный _id пользователя' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err.name} ${err.message}` });
    });
};

module.exports.findCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name} ${err.message}` }));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(new Error('NotFoundError'))
    .then(() => {
      Card.findByIdAndRemove(cardId)
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан некорректный _id карточки' });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err.name} ${err.message}` });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFoundError'))
    .then((likes) => {
      res.send(likes);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан некорректный _id карточки' });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err.name} ${err.message}` });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFoundError'))
    .then((likes) => {
      res.send(likes);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан некорректный _id карточки' });
      }
      return res.status(500).send({ message: `Произошла ошибка ${err.name} ${err.message}` });
    });
};
