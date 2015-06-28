var timelineConfig = require('../config/timelineConfig');
var cheerio = require('cheerio');
var fs = require('fs');

module.exports = function(req, res, next){
    fs.readFile('../index.html', function(er, data){
        $ = cheerio.load(data.toString());

        //fs.readFile(filepath, function(er, data){console.log('read file ,not timeline');
        //    $('#page-content').empty();
        //    $('#page-content').append(data.toString());
        //    res.statusCode = 200;
        //    res.writeHead({'Content-Type': 'text/html'});
        //    res.end($.html());
        //});
    });
}