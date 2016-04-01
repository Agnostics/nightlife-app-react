import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import User from '../models/user';
import init from './init';

console.log('in twitter.js');

passport.use(new TwitterStrategy({
    consumerKey: 'eAOJC7bG6c1xJzGsPK24U12YQ',
    consumerSecret: 'R1Je1xkkcEo0NALGDjOBiBwbWQNYmyeAhrCw5hUMatdwKI6JYN',
    callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback',
  }, (token, tokenSecret, profile, done) => {
	  User.findOne({ id: profile.id }, (err, user) => {
			if (user) return done(null, user);

			const newUser = new User({
		   	id: profile.id,
		   	displayName: profile.displayName,
		   	image: profile.photos[0].value,
		   	twitter: { token, tokenSecret, username: profile.username },
		   });

		   newUser.save(() => {
				if (err) throw err;
			   return done(err, newUser)
		   })

		return done(err)
      });
	}

));

// serialize user into the session
init();


module.exports = passport;
