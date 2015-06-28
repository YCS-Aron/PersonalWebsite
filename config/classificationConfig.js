/*
* config of file path
 */

var config = [
    //javascript
    {
        name: 'js-overview',
        regexp: /^(\/js-overview)$/,
        path: '../blog/tech/javascript-overview.html',
        classified: false
    },
    {
        name: 'js-oo',
        regexp: /^(\/js-oo)$/,
        path: '../blog/tech/javascript-object-orientied.html',
        classified: false
    },
    //ajax
    {
        name: 'ajax',
        regexp: /^(\/ajax)$/,
        path: '../blog/tech/ajax.html',
        classified: false
    },
    {
        name: 'jsonp',
        regexp: /^(\/jsonp)$/,
        path: '../blog/tech/cross-origin-and-jsonp.html',
        classified: false
    },
    //jQuery
    {
        name: 'jq-overview',
        regexp: /^(\/jq-overview)$/,
        path: '../blog/tech/jq-overview.html',
        classified: false
    },
    {
        name: 'jq-event',
        regexp: /^(\/jq-event)$/,
        path: '../blog/tech/jq-event.html',
        classified: false
    },
    //Node
    {
        name: 'nodejs-module',
        regexp: /^(\/nodejs-module)$/,
        path: '../blog/tech/nodejs-module.html',
        classified: false
    },
    //private
    {
        name: 'timeline',
        regexp: /^(\/timeline)$/,
        path: '../blog/private/timeline.html',
        classified: true
    }
];

module.exports = config;