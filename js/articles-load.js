(function(){
	var articleNames = ['javascript-overview'];
	var articleCount = articleNames.length;

	for(var i = 0; i < articleCount; i++) {
		var articleDOM = $('.blog-body.' + articleNames[i]);
		articleDOM.load('BlogArticles/Javascript/' + articleNames[i] + '.html');
	}
})();