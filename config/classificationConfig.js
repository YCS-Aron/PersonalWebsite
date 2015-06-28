/*
* config of file path
 */

var config = [
    //javascript
    {
        name: 'js-overview',
        regexp: /^(\/js-overview)$/,
        path: '../tech-blog/javascript-overview.html',
        classified: false
    },
    {
        name: 'js-oo',
        regexp: /^(\/js-oo)$/,
        path: '../tech-blog/javascript-object-orientied.html',
        classified: true
    },
    //ajax
    {
        name: 'ajax',
        regexp: /^(\/ajax)$/,
        path: '../tech-blog/ajax.html',
        classified: false
    },
    {
        name: 'jsonp',
        regexp: /^(\/jsonp)$/,
        path: '../tech-blog/cross-origin-and-jsonp.html',
        classified: false
    },
    //jQuery
    {
        name: 'jq-overview',
        regexp: /^(\/jq-overview)$/,
        path: '../tech-blog/jq-overview.html',
        classified: false
    },
    {
        name: 'jq-event',
        regexp: /^(\/jq-event)$/,
        path: '../tech-blog/jq-event.html',
        classified: false
    },
    //Node
    {
        name: 'nodejs-module',
        regexp: /^(\/nodejs-module)$/,
        path: '../tech-blog/nodejs-module.html',
        classified: false
    }
];

module.exports = config;