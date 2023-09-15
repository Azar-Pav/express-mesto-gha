const router = require('express').Router();

const {
  checkCreateCard,
  checkCardId,
} = require('../middlewares/requestValidators');

const {
  createCard,
  findCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('', findCards);
router.post('', checkCreateCard, createCard);
router.delete('/:cardId', checkCardId, deleteCard);
router.put('/:cardId/likes', checkCardId, likeCard);
router.delete('/:cardId/likes', checkCardId, dislikeCard);

module.exports = router;
