$(function(){
    var links = $('a.ycs-link');
    var loadingbar = $('#content-loading');

    var targetUrlMap = {
        'ycs': 'content.html',
        'timeline': 'timeline.html',
        'blocks': 'blocks.html',
        'js-oo': 'javascript-object-orientied.html',
        'js-overview': 'javascript-overview.html',
        'jsonp': 'cross-origin-and-jsonp.html',
        'ajax': 'ajax.html',
        'jq-overview': 'jq-overview.html',
        'jq-event': 'jq-event.html'
    };

    $('a.ycs-link').on('click', function(){
        var targetName = $(this).attr('linktarget');
        var url = targetUrlMap[targetName];
        if(url) {
            var element = this;
            var content = document.getElementById('page-content')
            content.innerHTML = '';
            loadingbar.show();
            $.ajax({
                url: url,           //HACK
                method: 'GET',
                dataType: 'html'
            }).then(function(response){
                loadingbar.fadeOut();
                setTimeout(function(){
                    history.pushState(null, null, targetName);
                    content.innerHTML = response;
                    $(content).find('pre code').each(function(index, codeblock){
                        hljs.highlightBlock(codeblock);			//COOL !
                    });
                }, 200);
            });
        }
    });
});