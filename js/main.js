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
		'travelPage': 'travelPage.html',
		'photo-blog': 'Pages/techBlog/BlogArticles/Javascript/javascript-object-orientied.html'
	}
	var htmlPath;
	var nextPageIndex;

	//page loading init
	var pageWrap = document.getElementById( 'pagewrap' ),
	pages = [].slice.call( pageWrap.querySelectorAll( 'div.container' ) ),
	currentPage = 0,
	triggerLoading = [].slice.call( pageWrap.querySelectorAll( '.pageload-link' ) ),
	loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 100 } );

	function pageLoadingInit() {
		triggerLoading.forEach( function( trigger ) {
			trigger.addEventListener( 'click', function( ev ) {
				ev.preventDefault();
				loader.show();
				htmlPath = indexNameMap[$(ev.target).attr('target')];
				nextPageIndex = currentPage ? 0 : 1;
				if(htmlPath) {
					$.ajax({
						url: htmlPath,
						method: 'GET',
						dataType: 'html'
					}).then(function(response) {
						setTimeout(function(){
	  						var newUrl = htmlPath;
	  						history.pushState(null,null,newUrl);
							loader.hide();
							$(pages[ nextPageIndex ]).innerHTML = response;
							classie.removeClass( pages[ currentPage ], 'show' );
							currentPage = currentPage ? 0 : 1;
							classie.addClass( pages[ currentPage ], 'show' );
						}, 200);
					});
					// Following request is synchronous ??????
					// $(pages[ nextPageIndex ]).load(htmlPath, function(){
					// 	loader.hide();
					// 	classie.removeClass( pages[ currentPage ], 'show' );
					// 	currentPage = currentPage ? 0 : 1;
					// 	classie.addClass( pages[ currentPage ], 'show' );
					// });
				}
			} );
		} );	
	}

	pageLoadingInit();

	window.addEventListener('popstate', function(event) {
	  	$.ajax({
			url: window.location.pathname,
			method: 'GET',
			dataType: "html"
		}).then(function(response) {
				window.location.pathname = htmlPath;
				loader.hide();
				nextPageIndex = currentPage ? 0 : 1;
				$(pages[ nextPageIndex ]).innerHTML = response;
				classie.removeClass( pages[ currentPage ], 'show' );
				currentPage = currentPage ? 0 : 1;
				classie.addClass( pages[ currentPage ], 'show' );
		});
	});

})();