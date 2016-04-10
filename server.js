var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var webpackConfig = require('./webpack.config');
var mongoose = require('mongoose');
var routes = require('./server/routes');
var session = require('express-session');
var passport = require('passport');
var cors = require('cors');

require('dotenv').config();

var isProduction = process.env.NODE_ENV === 'production';
var isDeveloping = !isProduction;
var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/nightlife-app';

mongoose.connect(url);
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

var app = express();

// Webpack dev server
if (isDeveloping) {
    var WEBPACK_PORT = 3001;
    var compiler = webpack(webpackConfig);
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

var publicPath = path.resolve(__dirname);
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

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '', 'index.html'))
})

var port = isProduction ? (process.env.PORT || 80) : 3000;
var server = http.createServer(app);

server.listen(port, function(err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Server running on port ' + port);
});
