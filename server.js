import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import webpackConfig from './webpack.config';

import jwt from 'jsonwebtoken';
import jwtConfig from './jwt.config.json';
import Yelp from 'yelp';
require('dotenv').config();


const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;

const app = express();

const opts = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET,
};

const yelp = new Yelp(opts);

// Webpack dev server
if (isDeveloping) {
  const WEBPACK_PORT = 3001;
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.listen(WEBPACK_PORT, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('WebpackDevServer listening at localhost:'+WEBPACK_PORT);
  });
}

//  RESTful API
const publicPath = path.resolve(__dirname);
app.use(bodyParser.json({ type: 'application/json' }))
app.use(express.static(publicPath));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = isProduction ? (process.env.PORT || 80) : 3000;

// this is necessary to handle URL correctly since client uses Browser History
app.get('/', function (req, res, next){
	res.sendFile(path.resolve(__dirname, '', 'index.html'))
	next();
})

app.get('/testyelp/:location', function(req, res) {

  yelp.search({
      term: 'bar',
      location: req.params.location,
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
    });
})


app.post('/api/login', function(req, res) {
      const credentials = req.body;
      if(credentials.user==='admin' && credentials.password==='password'){

        const profile = {'user': credentials.user};
        const jwtToken = jwt.sign(profile, jwtConfig.secret, {'expiresIn' : 5*60});  // expires in 300 seconds (5 min)
        res.status(200).json({
          id_token: jwtToken
        });

        //res.json({'user': credentials.user, 'role': 'ADMIN'});
      }else{
        res.status(401).json({'message' : 'Invalid user/password'});
      }
});

app.post('/api/logout', function(req, res) {
    res.status(200).json({'message' : 'User logged out'});
});

// We need to use basic HTTP service to proxy
// websocket requests from webpack
const server = http.createServer(app);

server.listen(port, function (err, result) {
  if(err){
    console.log(err);
  }
  console.log('Server running on port ' + port);
});
