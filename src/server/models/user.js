import mongoose from 'mongoose';
import validator from 'validator';


let userSchema = new mongoose.Schema ({
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
	if(!this.isModified('password')) {
		return next();
	}
	this.password = User.encryptPassword(this.password);
});

let User = mongoose.model('User', userSchema);

User.schema.path('password').validate(password => {
	return validator.isLength(password, 6);
});


User.schema.path('email').validate(email => {
	return validator.isEmail(email);
});

export default User;