var timelineConfig = require('../config/timelineConfig');
var todoConfig = require('../config/todoConfig');

var cheerio = require('cheerio');
var fs = require('fs');
var ejs = require('ejs');
var url = require('url');

var filterMap = {
    '/timeline': '/blog/private/timeline.html',
    '/todo': '/blog/private/todo.html'
};

var map = {
    '/blog/private/timeline.html': {
        tempPath: 'views/timelineT.ejs',
        tempConfig: timelineConfig
    },
    '/blog/private/todo.html': {
        tempPath: 'views/todoT.ejs',
        tempConfig: todoConfig
    }
};

var requestforWholePage = function(pathname){
    return !!filterMap[pathname];
};

var requestforContent = function(pathname){
    return !!map[pathname];
};

var renderContent = function(tempPath, config){
    var data = fs.readFileSync(tempPath).toString();
    return ejs.render(data, {config: config});
};

var renderWholePage = function(tempPath, config){
    var whole, $, data, template;
    whole = fs.readFileSync('../index.html').toString();
    $ = cheerio.load(whole);
    template = renderContent(tempPath, config);
    $('#page-content').empty();
    $('#page-content').append(template.toString());
    return $.html();
}

module.exports = function(req, res, next){
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    var tempPath, config;
    var data;
    var contentPath, result;

    if(requestforContent(pathname)){
        tempPath = map[pathname].tempPath;
        config = map[pathname].tempConfig;
        result = renderContent(tempPath, config);
        res.statusCode = 200;
        res.writeHead({'Content-Type': 'text/html'});
        res.end(result);
    } else if(requestforWholePage(pathname)){
        contentPath = filterMap[pathname];
        tempPath = map[contentPath].tempPath;
        config = map[contentPath].tempConfig;
        result = renderWholePage(tempPath, config);
        res.statusCode = 200;
        res.writeHead({'Content-Type': 'text/html'});
        res.end(result);
    } else {
        next();
    }
}