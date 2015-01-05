var path = require('path'),
    routes = require('./routes'),
    exphbs = require('express3-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    multer = require('multer'),
    moment = require('moment');


module.exports = function(app) {

  app.engine('handlebars', exphbs.create({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: [app.get('views') + '/partials'],
    helpers: {
      timeago: function(timestamp) {
        return moment(timestamp).startOf('minute').fromNow();
      }
    }
  }).engine);

  app.set('view engine', 'handlebars');

  app.use(morgan('dev'));
  app.use(multer({ dest: path.join(__dirname, '../upload/temp')}));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.use(methodOverride());
  app.use(cookieParser('some-secret-value-here'));

  routes.initialize(app, new express.Router());

  app.use('/public', express.static(path.join(__dirname, '../public')));

  if('development' === app.get('env')) {
    app.use(errorHandler());
  }

  return app;
};



















//
