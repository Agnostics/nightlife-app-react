import Yelp from 'yelp';
import Bar from '../models/bar';


module.exports = {

    fetchData(req, res) {
		Bar.findOne({ location: req.params.location.toLowerCase() }, (err, data) => {
		const bars = [];

		  if (err) return err
		  if (!data) {
				console.log('Creating New Bar');
			  const api = new Yelp({
  	            consumer_key: process.env.CONSUMER_KEY,
  	            consumer_secret: process.env.CONSUMER_SECRET,
  	            token: process.env.TOKEN,
  	            token_secret: process.env.TOKEN_SECRET,
  	        });

  	        api.search({
  	                term: 'bar',
  	                location: req.params.location,
  	            })
  	            .then((yelp) => {
			  yelp.businesses.forEach((bar) => {
			     const place = {
			     id: bar.id,
			     image_url: bar.image_url,
			     url: bar.url,
			     name: bar.name,
			     going: [],
			 }
				bars.push(place);
			 });

				const bar = new Bar({
					location: req.params.location.toLowerCase(),
					bars,
				})

				bar.save((dberr) => {
					if (dberr) return dberr
					return console.log('Created new bar');
				})

  	            return res.json(bar);
  	            })
  	            .catch((yelperr) => {
  	                return console.log(yelperr);
  	            });
			} else {
				console.log('Found Data!');

				return res.json(data);
			}
		})
    },

	postData(req, res) {
	    Bar.findOneAndUpdate({
	            location: req.body.location,
	            'bars.id': req.body.id,
	        }, {
	            $push: {
	                'bars.$.going': req.body.name,
	            },
	        },
			{ new: true },
	        (err, doc) => {
	            if (err) {
	                res.end();
	            } else {
					console.log(doc);
					res.status(200).send(doc)
	            }
	        });
	},

}
