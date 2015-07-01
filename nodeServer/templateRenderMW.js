var timelineConfig = require('../config/timelineConfig');
var cheerio = require('cheerio');
var fs = require('fs');
var ejs = require('ejs');
var url = require('url');


module.exports = function(req, res, next){
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    if(pathname === '/blog/private/timeline.html') {
        fs.readFile('views/timelineT.ejs', function(er, data){
            if(er) {
                res.statusCode = 404;
                res.end('File not find.');
            };

            var template = ejs.render(data.toString(), {config: timelineConfig});
            res.statusCode = 200;
            res.writeHead({'Content-Type': 'text/html'});
            res.end(template);
        });
    } else {
        next();
    }
}