import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

// userSchema.pre('save', next => {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   this.password = User.encryptPassword(this.password);
//   return next();
// });

User.schema.path('password').validate(password => {
  return validator.isLength(password, 6);
});

User.schema.path('email').validate(email => {
  return validator.isEmail(email);
});

export default User;
