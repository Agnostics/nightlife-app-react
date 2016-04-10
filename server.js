import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import webpackConfig from './webpack.config';
import mongoose from 'mongoose';
import routes from './server/routes';
import session from 'express-session';
import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import User from './server/models/user';
import cors from 'cors';

require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;
const url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/nightlife-app';

mongoose.connect(url);
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

const app = express();

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
    app.listen(WEBPACK_PORT, 'localhost', function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log('WebpackDevServer listening at localhost:' + WEBPACK_PORT);
    });
}

 var MongoStore = require('connect-mongo')(session);
//  RESTful API
const publicPath = path.resolve(__dirname);
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded());
app.use(session({
    secret: 'foo',
    store: new MongoStore({
	    url: url,
	    ttl: 14 * 24 * 60 * 60,
	    unset: 'destroy'
	})
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use('/', routes);

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '', 'index.html'))
})

const port = isProduction ? (process.env.PORT || 80) : 3000;
const server = http.createServer(app);

server.listen(port, function(err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Server running on port ' + port);
});
