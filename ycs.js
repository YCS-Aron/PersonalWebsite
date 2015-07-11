$(function(){
    var links = $('a.ycs-link');
    var loadingbar = $('#content-loading');
    var passwordPanel = $('#password-panel');
    var passwordInput = $('#password-panel input');
    var passwordButton = $('#password-panel button');
    var content = $('#page-content');
    var pwdNotification = $('#pwd-notification');

    //this data should put in server
    var targetUrlMap = {
        'ycs': 'content.html',
        'timeline': 'timeline.html',
        'blocks': 'blocks.html',
        'js-oo': 'blog/tech/javascript-object-orientied.html',
        'js-overview': 'blog/tech/javascript-overview.html',
        'jsonp': 'blog/tech/cross-origin-and-jsonp.html',
        'ajax': 'blog/tech/ajax.html',
        'jq-overview': 'blog/tech/jq-overview.html',
        'jq-event': 'blog/tech/jq-event.html',
        'nodejs-module': 'blog/tech/nodejs-module.html',
        'backbone-model': 'blog/tech/backbone-model.html',
        'backbone-view': 'blog/tech/backbone-view.html',
        'grunt-overview': 'blog/tech/grunt-overview.html',
        'timeline': 'blog/private/timeline.html',
        'todo': 'blog/private/todo.html',
        'nodejs-exp': 'blog/tech/nodejs-exp.html',
        'compiler-copy-and-collection': 'blog/tech/compiler-copy-and-collection.html',
        'compiler-gc': 'blog/tech/compiler-gc.html',
        'rest-overview': 'blog/tech/rest-overview.html',
        'js-qs': 'blog/tech/javascript-questions.html',
        'compatibility-js': 'blog/tech/compatibility-js.html'
    };

    //verify user input password
    var verifyPassword = function(){
        var promise = new $.Deferred();
        if(passwordInput.val() === 'ycs') {
            return promise.resolve();
        } else {
            passwordInput.val('');
            pwdNotification.text('密码错误!');
            return promise.reject();
        }
    };

    //check if the page need password
    var checkClassification = function(pathname) {
        var classificationPromise = new $.Deferred();
        $.ajax({
            url: pathname + '/ifClassified',
            method: 'GET'
        }).then(function(response){
            if(response === 'true') {
                //password is essential
                classificationPromise.resolve();
            } else {
                //password needless
                classificationPromise.reject();
            }
        }).done();
        return classificationPromise;
    };

    //verify classification and verify pwd and load content
    var flow = function(targetName){
        var passPwdPromise = new $.Deferred();
        var url = getPathWithIndex(targetName);

        checkClassification(targetName).then(function(){
            //if this blog is classified , show the password panel
            loadingbar.hide();
            content.empty();
            passwordPanel.show();
            passwordInput.focus();
            passwordButton.bind('click', function(){
                if(passwordInput.val() === 'ycs') {
                    passwordInput.val('');
                    passPwdPromise.resolve();
                } else {
                    passwordInput.val('');
                    pwdNotification.text('密码错误!');
                }
            });
            passwordInput.keydown(function(e){              //HACK: why the value will be empty.I did not remove listener.so it will trigger twice.
                var keycode = e.keyCode || e.which || event.which;
                if(keycode === 13){
                    if(passwordInput.val() === 'ycs') {
                        passwordInput.val('');
                        passPwdPromise.resolve();
                    } else {
                        passwordInput.val('');
                        pwdNotification.text('密码错误!');
                    }
                }
            });
        }, function(){
            passPwdPromise.resolve();
        }).done();

        passPwdPromise.then(function(){
            //if this blog is not classified , load the html content
            passwordButton.unbind('click');
            passwordInput.unbind('keydown');

            passwordPanel.hide();
            loadingbar.show();
            $.ajax({
                url: url,           //HACK
                method: 'GET',
                dataType: 'html'
            }).then(function(response){
                loadingbar.fadeOut();
                setTimeout(function(){
                    history.pushState(null, null, targetName);
                    content.empty();
                    content.append($(response))
                    content.find('pre code').each(function(index, codeblock){
                        hljs.highlightBlock(codeblock);			//COOL !
                    });
                }, 200);
            });
        });
    };

    //
    var getPathWithIndex = function(targetName){
        return targetUrlMap[targetName];
    };

    //add click listener to blog link
    $('a.ycs-link').bind('click', function(e){
        var elem = $(e.target).closest('a');      //HACK:  why e.target will become span element.
        var targetName = elem.attr('linktarget');

        if(targetName && getPathWithIndex(targetName)){
            if(targetName) {
                loadingbar.show();
                content.empty();
                flow(targetName);
            }
        }
    });

    if(window.location.pathname) {
        var initTargetName = window.location.pathname.slice(1);
        if(initTargetName && getPathWithIndex(initTargetName)) {
            flow(window.location.pathname.slice(1));
        }
    }
});