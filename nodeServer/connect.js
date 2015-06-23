var connect = require('connect'),
    static = require('serve-static');

var app = connect();

app.use(require('./BlogRouter'));
app.use(static("../../mywebsite"));
app.listen(3000);
console.log('started server,listening at port 80');