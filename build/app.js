"use strict";
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path_1 = require('path');
var home_1 = require('./routes/home');
var users_1 = require('./routes/users');
var some_route_1 = require('./routes/some-route');
var cookieParser = require('cookie-parser'); // this module doesn't use the ES6 default export yet
var app = express();
// view engine setup
app.set('views', path_1.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path_1.join(__dirname, 'public')));
app.use('/', home_1.default);
app.use('/users', users_1.default);
app.use('/some-route', some_route_1.someRoute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (error, req, res, next) {
        res.status(error['status'] || 500);
        res.render('error', {
            message: error.message,
            error: error
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (error, req, res, next) {
    res.status(error['status'] || 500);
    res.render('error', {
        message: error.message,
        error: {}
    });
    return null;
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
//# sourceMappingURL=app.js.map