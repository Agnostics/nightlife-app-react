import express from 'express';
import yelp from './yelp';
// import twitter from './twitter';
import passportTwitter from '../auth/twitter'
import path from 'path';

const router = express.Router(); // eslint-disable-line

router.get('/yelp/:location', yelp.fetchData);

// auth
// router.get('/auth/twitter', twitter.auth);
// router.get('/auth/twitter/callback', twitter.cb);

router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
	console.log(req.user);
    res.json(req.user);
  });

router.get('/', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '', 'index.html'))
	next();
})


module.exports = router;
