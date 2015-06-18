var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();
app.use(serveStatic("../../mywebsite"));
app.listen(3000);
console.log('started server,listening at port 80');