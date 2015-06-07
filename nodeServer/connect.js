var connect = require('connect');
var app = connect().use(connect.static(__dirname));
app.listen(80);