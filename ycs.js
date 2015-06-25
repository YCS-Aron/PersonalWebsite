$(function(){
    var links = $('a.ycs-link');
    var loadingbar = $('#content-loading');
    var passwordPanel = $('#password-panel');
    var passwordInput = $('#password-panel input');
    var passwordButton = $('#password-panel button');
    var content = $('#page-content');
    var pwdNotification = $('#pwd-notification');

    var targetUrlMap = {
        'ycs': 'content.html',
        'timeline': 'timeline.html',
        'blocks': 'blocks.html',
        'js-oo': 'tech-blog/javascript-object-orientied.html',
        'js-overview': 'tech-blog/javascript-overview.html',
        'jsonp': 'tech-blog/cross-origin-and-jsonp.html',
        'ajax': 'tech-blog/ajax.html',
        'jq-overview': 'tech-blog/jq-overview.html',
        'jq-event': 'tech-blog/jq-event.html'
    };

    $('a.ycs-link').on('click', function(){
        var targetName = $(this).attr('linktarget');
        var url = targetUrlMap[targetName];
        var classifiedPromise = new $.Deferred();
        if(url) {
            //check classified
            if($(this).hasClass('classified')) {
                content.empty();
                passwordPanel.show();
                passwordInput.val('');
                passwordInput.focus();
                var sumitHandler = function(){
                    if(passwordInput.val() === 'ycs') {
                        passwordPanel.hide();
                        classifiedPromise.resolve();
                    } else {
                        passwordInput.val('');
                        pwdNotification.text('密码错误!');
                    }
                };
                passwordButton.bind('click', sumitHandler);
                //passwordButton.bind('click', sumitHandler);  绑定回车按键事件
            } else {
                classifiedPromise.resolve();
            }

            classifiedPromise.then(function(){
                //loading blog content
                var element = this;
                content.empty();
                loadingbar.show();
                $.ajax({
                    url: url,           //HACK
                    method: 'GET',
                    dataType: 'html'
                }).then(function(response){
                    loadingbar.fadeOut();
                    setTimeout(function(){
                        history.pushState(null, null, targetName);
                        content.append($(response))
                        content.find('pre code').each(function(index, codeblock){
                            hljs.highlightBlock(codeblock);			//COOL !
                        });
                    }, 200);
                });
            });
        }
    });
});