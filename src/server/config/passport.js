import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import mongoose from 'mongoose';

let User = mongoose.model('User');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, done);
});

function authFail(done) {
	done(null, false, {message: 'Incorrect email/password combination'});
};

passport.use(new LocalStrategy(function (email, password, done) {
	User.findOne(
		{email: email},
		function (err, user) {
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

