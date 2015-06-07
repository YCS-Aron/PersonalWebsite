var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();
app.use(serveStatic("../../PersonalWebsite"));
app.listen(80);