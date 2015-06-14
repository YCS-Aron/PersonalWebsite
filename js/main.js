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
		'photo-blog': 'travelPage.html',
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
				htmlPath = indexNameMap[ev.target.attr('target')];
				nextPageIndex = currentPage ? 0 : 1;
				if(htmlPath) {
					$(pages[ nextPageIndex ]).load(htmlPath).then(function(){
						loader.hide();
						classie.removeClass( pages[ currentPage ], 'show' );
						currentPage = currentPage ? 0 : 1;
						classie.addClass( pages[ currentPage ], 'show' );
					});
				}

				// // after some time hide loader
				// setTimeout( function() {
				// 	loader.hide();

				// 	classie.removeClass( pages[ currentPage ], 'show' );
				// 	// update..
				// 	currentPage = currentPage ? 0 : 1;
				// 	classie.addClass( pages[ currentPage ], 'show' );

				// }, 2000 );
			} );
		} );	
	}

	pageLoadingInit();

})();