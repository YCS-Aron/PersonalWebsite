$(function(){
    var links = $('a.ycs-link');
    var loadingbar = $('#content-loading');

    var getTargetUrl = function(targetName){
        return targetName === 'ycs';
    }

    $('a.ycs-link').on('click', function(){
        var targetName = $(this).attr('linktarget');
        if(getTargetUrl(targetName)) {
            var element = this;
            var content = document.getElementById('page-content')
            content.innerHTML = '';
            loadingbar.show();
            $.ajax({
                url: 'content.html',
                method: 'GET',
                dataType: 'html'
            }).then(function(response){
                setTimeout(function(){
                    content.innerHTML = response;
                    loadingbar.hide();
                }, 500);
            });
        }
    });
});