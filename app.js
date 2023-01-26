//import
var express = require('express');
var path = require("path");
var app = express();
const port = process.env.PORT || 3000;

var mongoose = require("mongoose");
const { format } = require("date-fns");

import mongoose from 'mongoose'
mongoose.connect("mongodb+srv://CACS:2htNSu0fmuqp8Itm@cluster0.ovf6qf7.mongodb.net/?retryWrites=true&w=majority");
app.set('port', port);
  
//static files
app.use(express.static(path.join(__dirname, "public")));
app.use('/js', express.static(path.join(__dirname + '/node_modules/bootstrap/dist/js'))); // redirect bootstrap JS
app.use('/css', express.static(path.join(__dirname + '/node_modules/bootstrap/dist/css')));
app.use("/css", express.static(__dirname + 'public/css'));
app.use("/js", express.static(__dirname + 'public/js'));

 //set views
app.set('views', './views');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); 
  
var results = require('./routes/results');
app.use('/results', results);

app.get('/about', (req, res) => {
  res.render('about', { text: 'About Page'})
});

app.get('/529Criteria', (req, res) => {
  res.render('529Criteria', { text: '529 Criteria'})
});

app.get('/contact', (req, res) => {
  res.render('contact', { text: 'Contact Page'});
});
  
//  app.get('/contactSubmission', (req, res) => {
//    res.render('contactSubmission', { text: 'Contact Submission Page'});
// URL at which MongoDB service is running
//    import mongoose from 'mongoose'
//    mongoose.connect("mongodb+srv://CACS:2htNSu0fmuqp8Itm@cluster0.ovf6qf7.mongodb.net/?retryWrites=true&w=majority";

app.get('', (req, res) => {
  res.render('index', { text: 'This is EJS'})
});
  
app.get('', (req, res) => {
  res.render('base', { text: 'This is EJS'})
});


//Listen on port
app.use('/', express.static('/home/site/wwwroot', options));
app.listen(port, () => console.info('Listen on port ${port}'));

get
