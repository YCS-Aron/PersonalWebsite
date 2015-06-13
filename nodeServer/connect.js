var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();
app.use(serveStatic("../../PersonalWebsite"));
app.listen(80);
console.log('started server,listening at port 80');

// Backbone: line 1556
// protoProps:  JSON
// staticProps: JSON
// 返回一个新的对象child，参数protoProps中的属性会被添加到新对象的prototype中，staticProps中的属性则直接绑定到新对象上作为静态属性
var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    //管理子类的constructor属性
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    //将parent和staticProps上的属性复制到child对象上
    //parent是子类的静态成员对象，即this，比如Backbone.Model.extend()，parent就是Model上的静态属性
    //staticProps中是子类要新添加的静态属性
    //这样会操作到parent中的prototype属性，但是后面会被覆盖重写
    _.extend(child, parent, staticProps);

    //构造prototype对象，其中包含有子类prototype所有的属性和constructor属性，并赋值给child.prototype
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;   
    child.prototype = new Surrogate;          //COOL!!

    //从protoProps中复制属性到子类的prototype中
    if (protoProps) _.extend(child.prototype, protoProps);

    //将基类的constructor作为子类的静态属性
    child.__super__ = parent.prototype;

    return child;
};

// Set up inheritance for the model, collection, router, view and history.
Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;