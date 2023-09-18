const http2 = require('http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const BadRequestErr = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictErr = require('../errors/conflict-err');
const UnauthorizedErr = require('../errors/unauthorized-err');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }

      return res.send({ data: user });
    })
    .catch((err) => {
      let error = err;

      if (err.name === 'CastError') {
        error = new BadRequestErr('Переданы некорректные данные');
      }

      next(error);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      let error = err;

      if (err.name === 'ValidationError') {
        error = new BadRequestErr('Переданы некорректные данные');
      }

      next(error);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res
      .status(http2.constants.HTTP_STATUS_CREATED)
      .send({
        data: {
          email: user.email,
          name: user.name,
        },
      }))
    .catch((err) => {
      let error = err;

      if (err.code === 11000) {
        error = new ConflictErr('Переданы некорректные данные');
      }
      if (err.name === 'ValidationError') {
        error = new BadRequestErr('Переданы некорректные данные');
      }

      next(error);
    });
};

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then(async (user) => {
      if (!user) {
        throw new UnauthorizedErr('Неправильные почта или пароль');
      }

      return {
        matched: await bcrypt.compare(password, user.password),
        _id: user._id.toString(),
      };
    })
    .then(({ matched, _id }) => {
      if (!matched) {
        throw new UnauthorizedErr('Неправильные почта или пароль');
      }

      const { NODE_ENV, JWT_SECRET } = process.env;
      const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';
      const token = jwt.sign({ _id }, jwtSecret, { expiresIn: '7d' });

      return res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .status(200)
        .json({ message: 'Logged in successfully 😊 👌' });
    })
    .catch(next);
};

module.exports.signout = (req, res) => res
  .clearCookie('access_token')
  .status(200)
  .json({ message: 'Successfully logged out 😏 🍀' });
