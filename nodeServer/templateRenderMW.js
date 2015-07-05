var timelineConfig = require('../config/timelineConfig');
var todoConfig = require('../config/todoConfig');

var cheerio = require('cheerio');
var fs = require('fs');
var ejs = require('ejs');
var url = require('url');

var map = {
    '/blog/private/timeline.html': {
        tempPath: 'views/timelineT.ejs',
        tempJson: timelineConfig
    },
    '/blog/private/todo.html': {
        tempPath: 'views/todoT.ejs',
        tempJson: todoConfig
    }
}

module.exports = function(req, res, next){
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    var tempPath, config;
    var data;
    if(map[pathname]) {
        tempPath = map[pathname].tempPath;
        config = map[pathname].tempJson;
        data = fs.readFileSync(tempPath).toString()
        var template = ejs.render(data, {config: config});
        res.statusCode = 200;
        res.writeHead({'Content-Type': 'text/html'});
        res.end(template);console.log('1');
    } else {
        next();
    }
}