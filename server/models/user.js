"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let userSchema = new _mongoose.default.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  create_at: {
    type: Date,
    default: Date.now
  }
});
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = User.encryptPassword(this.password);
});

let User = _mongoose.default.model('User', userSchema);

User.schema.path('password').validate(password => {
  return _validator.default.isLength(password, 6);
});
User.schema.path('email').validate(email => {
  return _validator.default.isEmail(email);
});
var _default = User;
exports.default = _default;