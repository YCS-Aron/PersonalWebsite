$(function(){
    var links = $('a.ycs-link');
    //var loadingbar = $('#loading-small');
    $('a.ycs-link').on('click', function(){
        var targetName = $(this).attr('linktarget');
        var element = this;
        var content = document.getElementById('page-content')
        content.innerHTML = '';
        //loadingbar.show();
        $.ajax({
            url: 'content.html',
            method: 'GET',
            dataType: 'html'
        }).then(function(response){
            content.innerHTML = response;
            setTimeout(function(){
                //loadingbar.hide();
            }, 1000);
        });
    });
});