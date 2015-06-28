var url = require('url');
var fs = require('fs');
var ejs = require('ejs');
var path = require('path');
var cheerio = require('cheerio');
var config = require('../config/classificationConfig');

module.exports = function(req, res, next) {
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    var $, content, regexp, filepath;

    //console.log(__dirname);       Users/YCS/mywebsite/nodeServer

    config.forEach(function(item, index){
        if(item.regexp.test(pathname)) {
            filepath = item.path;
        }
    });

    if(filepath) {
        fs.readFile('../index.html', function(er, data){
            if(er) {
                res.statusCode = 404;
                res.end('File not find.');
            };

            $ = cheerio.load(data.toString());

            fs.readFile(filepath, function(er, data){console.log('read file ,not timeline');
                $('#page-content').empty();
                $('#page-content').append(data.toString());
                res.statusCode = 200;
                res.writeHead({'Content-Type': 'text/html'});
                res.end($.html());
            });
        });
    } else {
        next();  //this line must put in right place, or cast error: Can\'t render headers after they are sent to the client.
    }
}