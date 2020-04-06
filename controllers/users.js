const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET } = require('../configuration/settings');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch(next);
};

const signUp = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(201).send({ data: user }))
    .catch(next);
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ token });
    })
    .catch((err) => next(new UnauthorizedError(err)));
};

module.exports = { getUser, signUp, signIn };
