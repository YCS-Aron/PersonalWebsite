var static = require('serve-static');
var express = require('express');
var http = require('http');
var ClassificationVerifier = require('./ClassificationVerifier');

var app = express();

app.get('/:blogIndexName/ifClassified', ClassificationVerifier);
app.use(require('./BlogRouter'));
app.use(static("../../mywebsite"));

http.createServer(app).listen(3000, function(){
    console.log('Server of ycs blog start on port 3000');
});
