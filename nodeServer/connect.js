var static = require('serve-static');
var express = require('express');
var http = require('http');
var path = require('path');
var ClassificationVerifier = require('./ClassificationVerifier');

//var timelineConfig = require('../config/timelineConfig');

var app = express();

app.set('views', path.join(__dirname, 'views'));    //views环境变量代表视图文件的目录
app.set('view engine', 'ejs');

//app.get('/timeline', function(req, res, nexts){
//    res.render('timelineT', {config: timelineConfig});
//});
app.get('/:blogIndexName/ifClassified', ClassificationVerifier);
app.use(require('./BlogRouter'));
app.use(static("../../mywebsite"));

http.createServer(app).listen(3000, function(){
    console.log('Server of ycs blog start on port 3000');
});
