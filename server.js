const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const logger = require("morgan");
const db = require("./models");
const apiRoutes = require('./routes/apiRoutes')
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger("dev"));

app.use('/api', apiRoutes);

app.use(express.static('client/build'));

app.use('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


// commented out until mongo is set up to reduce terminal tabs required to run project in development
mongoose.Promise = Promise;

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
}
else {
    mongoose.connect("mongodb://localhost/fyrrDB3", {
        useMongoClient: true
    });
}


app.listen(process.env.PORT || 3001);

module.exports = app;
