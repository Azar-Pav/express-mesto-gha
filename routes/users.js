const router = require('express').Router();

const {
  checkUserId,
  checkUpdateUser,
  checkUpdateAvatar,
} = require('../middlewares/requestValidators');

const {
  findUser,
  findUsers,
  changeUserAvatar,
  changeUserProfile,
} = require('../controllers/users');

router.get('', findUsers);
router.get('/:userId', checkUserId, findUser);
router.patch('/me', checkUpdateUser, changeUserProfile);
router.patch('/me/avatar', checkUpdateAvatar, changeUserAvatar);

module.exports = router;
