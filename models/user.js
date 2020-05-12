const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const { INVALID_MAIL } = require('../configuration/constants');
const { ERROR_SIGN_IN } = require('../configuration/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: INVALID_MAIL,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.plugin(uniqueValidator);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(ERROR_SIGN_IN);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(ERROR_SIGN_IN);
          }
          return user;
        });
    });
};

userSchema.methods.omitPrivate = function omitPrivate() {
  const data = this.toObject();
  delete data.password;
  delete data.__v;
  return data;
};

module.exports = mongoose.model('user', userSchema);
