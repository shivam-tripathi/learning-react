"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let User = _mongoose.default.model('User');

_passport.default.serializeUser((user, done) => {
  done(null, user.id);
});

_passport.default.deserializeUser((id, done) => {
  User.findById(id, done);
});

function authFail(done) {
  done(null, false, {
    message: 'Incorrect email/password combination'
  });
}

;

_passport.default.use(new _passportLocal.Strategy(function (email, password, done) {
  User.findOne({
    email: email
  }, function (err, user) {
    if (err) return done(err);

    if (!user) {
      return authFail(done);
    }

    if (!user.validPassword(password)) {
      return authFail(done);
    }

    return done(null, user);
  });
}));