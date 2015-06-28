/*
* ClassificationVerifier Middle Ware: verify classification of file that url asking for
* */
var url = require('url');
var config = require('../config/classificationConfig');

module.exports = function(req, res, next) {
    var blogIndexName = req.params.blogIndexName;
    var ifClassified;

    config.forEach(function(item, index){
        if(item.name === blogIndexName) {
            ifClassified = item.classified;
        }
    });

    if(ifClassified) {
        res.statusCode = 200;
        res.writeHead({'Content-Type': 'text/plain'});
        res.end('true');
    } else {
        res.statusCode = 200;
        res.writeHead({'Content-Type': 'text/plain'});
        res.end('false');
    }
}