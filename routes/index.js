const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const {
  createUser,
  login,
} = require('../controllers/users');

const auth = require('../middlewares/auth');
const {
  checkLogin,
  checkCreateUser,
} = require('../middlewares/requestValidators');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', checkLogin, login);
router.post('/signup', checkCreateUser, createUser);
// router.use(auth);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = router;
