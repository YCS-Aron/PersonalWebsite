var url = require('url');
var fs = require('fs');
var cheerio = require('cheerio');

var map = [
    {
        regexp: /^(\/js-oo)$/,
        path: '../tech-blog/javascript-object-orientied.html'
    },
    {
        regexp: /^(\/js-overview)$/,
        path: '../tech-blog/javascript-overview.html'
    },
    {
        regexp: /^(\/ajax)$/,
        path: '../tech-blog/ajax.html'
    },
    {
        regexp: /^(\/jsonp)$/,
        path: '../tech-blog/cross-origin-and-jsonp.html'
    },
    {
        regexp: /^(\/jq-overview)$/,
        path: '../tech-blog/jq-overview.html'
    },
    {
        regexp: /^(\/jq-event)$/,
        path: '../tech-blog/jq-event.html'
    }
];

module.exports = function(req, res, next) {
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    var $, content, regexp, filepath;

    map.forEach(function(item, index){
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
            fs.readFile(filepath, function(er, data){
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