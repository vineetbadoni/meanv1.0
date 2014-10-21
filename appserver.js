/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes/index')
    , user = require('./routes/user')
    , angularview = require('./routes/angularview')
    , http = require('http')
    , path = require('path');

var app = express();

var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use('/public',express.static(path.join(__dirname, '/public')));

console.log(path.join(__dirname, 'public'));
//Hooking up the GUIs

//This enables to use ejs files as views
//app.set('view engine', 'ejs');

//This enables the .html files are views
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Hooking up the GUIs

// Development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/angularview', angularview.angularview);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});