const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  createUser,
  findUser,
  findUsers,
  changeUserAvatar,
  changeUserProfile,
  login,
} = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);
router.get('', auth, findUsers);
router.get('/:userId', auth, findUser);
router.patch('/me', auth, changeUserProfile);
router.patch('/me/avatar', auth, changeUserAvatar);

module.exports = router;
