//import
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

//static files
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use("/css", express.static(__dirname + 'public/css'));
app.use("/js", express.static(__dirname + 'public/js'));

//set views
app.set('views', './views');
app.set('view engine', 'ejs');

const results = require('./routes/results');
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
//app.get('/contactSubmission', (req, res) => {
//    res.render('contactSubmission', { text: 'Contact Submission Page'});
    // URL at which MongoDB service is running
//    var url = "mongodb+srv://CACS:2htNSu0fmuqp8Itm@cluster0.ovf6qf7.mongodb.net/?retryWrites=true&w=majority";
//    var database;
    // A Client to MongoDB
//    var MongoClient = require('mongodb').MongoClient;
//    var contact_json = {};
//    contact_json["Name"] = req.query.inputName;
//    contact_json["Email"] = req.query.inputEmail;
//    contact_json["Details"] = req.query.details;

//    MongoClient.connect(url, function(err, db) {
//        if (err) throw err;
        //console.log("Connected to MongoDB! (contact)");
 //       database = db.db("UVA_COA");
 //       database.collection("Contact Form Inputs").insert(contact_json, function(err, result){
 //           if(err){
 //              console.log(err);
 //           }else{
             //   console.log(result);
//            }
//        });
//        db.close();
//    });
//});

app.get('', (req, res) => {
    res.render('index', { text: 'This is EJS'})
});
app.get('', (req, res) => {
    res.render('base', { text: 'This is EJS'})
});

//Listen on port
app.listen(port, () => console.info(`Listen on port ${port}`));
