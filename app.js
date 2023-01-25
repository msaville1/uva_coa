//import
var express = require('express');
var server = express();
var options =  {
  index: 'index.html'
};
var mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { format } = require("date-fns");

var configData = require("./config/connection");
var indexRouter = require("./routes/index");

async function getApp() {
  var connectionInfo = await configData.getConnectionInfo();
 // import mongoose from 'mongoose'
 // mongoose.connect("mongodb+srv://CACS:2htNSu0fmuqp8Itm@cluster0.ovf6qf7.mongodb.net/?retryWrites=true&w=majority");
  var app = express();
  var port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);

//set views
  app.set('views', './views');
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");

//engine startup
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.locals.format = format;

  app.use("/", indexRouter);
  app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js")); // redirect bootstrap JS
  app.use(
    "/css",
    express.static(__dirname + "/node_modules/bootstrap/dist/css"));
  // redirect CSS bootstrap

  var results = require('./routes/results');
  app.use('/results', results);
  
  app.use(function (req, res, next) {
    next(createError(404));
  });

  app.get('/about', (req, res) => {
    res.render('about', { text: 'About Page'})
  });

  app.get('/529Criteria', (req, res) => {
      res.render('529Criteria', { text: '529 Criteria'})
  });

  app.get('/contact', (req, res) => {
      res.render('contact', { text: 'Contact Page'});
  });
  app.use(function (err, req, res, next) {
// set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
// render the error page
    res.status(err.status || 500);
    res.render("error");
  });
  app.get('/contactSubmission', (req, res) => {
    res.render('contactSubmission', { text: 'Contact Submission Page'});
// URL at which MongoDB service is running
//    import mongoose from 'mongoose'
//    mongoose.connect("mongodb+srv://CACS:2htNSu0fmuqp8Itm@cluster0.ovf6qf7.mongodb.net/?retryWrites=true&w=majority";

  app.get('', (req, res) => {
      res.render('index', { text: 'This is EJS'})
  });
  app.get('', (req, res) => {
      res.render('base', { text: 'This is EJS'})
  });

  return app;
}
//Listen on port
server.use('/', express.static('/home/site/wwwroot', options));
server.listen(process.env.PORT);

/**
 * Normalize a port into a number, string, or false.
 */

 function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
module.exports = {
  getApp
};
