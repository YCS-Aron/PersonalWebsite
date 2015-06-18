/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {
	var indexNameMap = {
		'travelPage': {
			urlName: 'travelPage.html',
			requestUrl: 'travelPage.html'
		},
		'tech-blog': {
			urlName: 'Javascript/javascript-object-orientied.html',
			requestUrl: 'Pages/techBlog/BlogArticles/Javascript/javascript-object-orientied.html'
		},

	}
	var htmlPath;
	var nextPageIndex;
	var targetPage;

	//page loading init
	var pageWrap = document.getElementById( 'pagewrap' ),
	pages = [].slice.call( pageWrap.querySelectorAll( 'div.container' ) ),
	currentPage = 0,
	triggerLoading = [].slice.call( pageWrap.querySelectorAll( '.pageload-link' ) ),
	loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 100 } ),
	newUrl;

	function pageLoadingInit() {
		triggerLoading.forEach( function( trigger ) {
			trigger.addEventListener( 'click', function( ev ) {
				ev.preventDefault();
				loader.show();
				if($(ev.target).attr('target') === 'travelPage') {
					window.open('/travelPage.html');
					return ;
				}
				setTimeout(function() {
					var Map = indexNameMap[$(ev.target).attr('target')];
					targetPage = Map.requestUrl;
					nextPageIndex = currentPage ? 0 : 1;
					if(targetPage) {
						$.ajax({
							url: targetPage,
							method: 'GET',
							dataType: 'html'
						}).then(function(response) {
	  						history.pushState(null, null, Map.urlName);
							loader.hide();
							$(pages[ nextPageIndex ]).empty();
							pages[ nextPageIndex ].innerHTML = response;
							classie.removeClass( pages[ currentPage ], 'show' );
							currentPage = currentPage ? 0 : 1;
							classie.addClass( pages[ currentPage ], 'show' );
							$(pages[ currentPage ]).find('pre code').each(function(index, codeblock){
								hljs.highlightBlock(codeblock);			//COOL !
							});
						});
						// Following request is synchronous ??????
						// $(pages[ nextPageIndex ]).load(htmlPath, function(){
						// 	loader.hide();
						// 	classie.removeClass( pages[ currentPage ], 'show' );
						// 	currentPage = currentPage ? 0 : 1;
						// 	classie.addClass( pages[ currentPage ], 'show' );
						// });
					}
				}, 1000);
			} );
		} );	
	}

	pageLoadingInit();

	window.addEventListener('popstate', function(event) {
		// loader.show();
		// window.location.pathname = htmlPath;
		// loader.hide();
		// nextPageIndex = currentPage ? 0 : 1;
		// $(pages[ nextPageIndex ]).innerHTML = response;
		// classie.removeClass( pages[ currentPage ], 'show' );
		// currentPage = currentPage ? 0 : 1;
		// classie.addClass( pages[ currentPage ], 'show' );
	});

})();