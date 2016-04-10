var passport = require('passport');
var TwitterStrategy  = require('passport-twitter').Strategy;
var User = require('../models/user');
var init = require('./init');

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: 'https://nightlife-app-redux.herokuapp.com/auth/twitter/callback',
  }, function(token, tokenSecret, profile, done) {
	  User.findOne({ id: profile.id }, function(err, user) {
			if (user) return done(null, user);

			var newUser = new User({
		   	id: profile.id,
		   	displayName: profile.displayName,
		   	image: profile.photos[0].value,
		   	twitter: { token, tokenSecret, username: profile.username },
		   });

		   newUser.save(function() {
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
