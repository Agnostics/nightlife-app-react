var Yelp = require('yelp');
var Bar = require('../models/bar');


module.exports = {

    fetchData(req, res) {
		Bar.findOne({ location: req.params.location.toLowerCase() }, function(err, data) {
		var bars = [];

		  if (err) return err
		  if (!data) {
				console.log('Creating New Bar');
			    var api = new Yelp({
  	            consumer_key: process.env.CONSUMER_KEY,
  	            consumer_secret: process.env.CONSUMER_SECRET,
  	            token: process.env.TOKEN,
  	            token_secret: process.env.TOKEN_SECRET,
  	        });

  	        api.search({
  	                term: 'bar',
  	                location: req.params.location,
  	            })
  	            .then(function(yelp) {
			  yelp.businesses.forEach(function(bar) {
			     var place = {
			     id: bar.id,
			     image_url: bar.image_url,
			     url: bar.url,
			     name: bar.name,
			     going: [],
			 }
				bars.push(place);
			 });

				var bar = new Bar({
					location: req.params.location.toLowerCase(),
					bars,
				})

				bar.save(function(dberr) {
					if (dberr) return dberr
					return console.log('Created new bar');
				})

  	            return res.json(bar);
  	            })
  	            .catch(function(yelperr) {
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
	        function(err, doc) {
	            if (err) {
	                res.end();
	            } else {
					console.log(doc);
					res.status(200).send(doc)
	            }
	        });
	},

}
