// server.js

// BASE SETUP
// call the packages we need
let express    = require('express');        // call express
let app        = express();                 // define our app using express
let bodyParser = require('body-parser');
let mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/user',{ useMongoClient: true }); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 3001;        // set our port

// ROUTES FOR OUR API
let routes = require('./routes/routes');

// all of our routes will be prefixed with /api
app.use('/api', routes);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
