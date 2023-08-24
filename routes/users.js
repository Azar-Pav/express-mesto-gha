const router = require('express').Router();

const {
  createUser,
  findUser,
  findUsers,
  changeUserAvatar,
  changeUserProfile,
} = require('../controllers/users');

router.get('', findUsers);
router.get('/:userId', findUser);
router.post('', createUser);
router.patch('/me', changeUserProfile);
router.patch('/me/avatar', changeUserAvatar);

module.exports = router;
