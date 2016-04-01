import Yelp from 'yelp';

module.exports = {

    fetchData(req, res) {
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
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
            });
    },

}
