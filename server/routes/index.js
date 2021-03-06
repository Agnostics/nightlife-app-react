var express = require('express');
var yelp = require('./yelp');
var passportTwitter = require('../auth/twitter');

var router = express.Router(); // eslint-disable-line

router.get('/yelp/:location', yelp.fetchData);
router.post('/yelp/', yelp.postData);


// router.get('/yelp/attend/:location', yelp.fetchAttend);


router.get('/auth/login', function(req, res) {
	res.json(req.user);
})

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login', successRedirect: '/' }));


module.exports = router;
