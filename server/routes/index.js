import express from 'express';
import yelp from './yelp';
import passportTwitter from '../auth/twitter'

const router = express.Router(); // eslint-disable-line

router.get('/yelp/:location', yelp.fetchData);
router.post('/yelp/:location', yelp.postData);


// router.get('/yelp/attend/:location', yelp.fetchAttend);


router.get('/auth/login', (req, res) => {
	res.json(req.user);
})

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    res.json(req.user);
  });


module.exports = router;
