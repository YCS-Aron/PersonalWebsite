var PageTransitions = (function() {

	var $main = $( '.pt-main' ),
		$pages = $main.children( 'div.pt-page' ),
		$sidebarOptions = $('li.sidebar-option'),
		$albumOptions = $('.blog-masonry .blog-box a.album-option'),
		$blogOptions = $('.blog-item-list .blog-option'),
		animcursor = 1,
		pagesCount = $pages.length,
		current = 0,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimatio1nEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = "webkitAnimationEnd",		//Hack: this modification is to provide conveninence to test
		// animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations;
	
	function init() {

		$pages.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

		$pages.eq( current ).addClass( 'pt-page-current' );			//pt-page-current define the css of current view

		$sidebarOptions.each(function(index, el) {
			el.onclick = function() {				//parentElement and onclick are attributes of DOM
				var nextPageIndex = (el.getAttribute('option-index')[0] - '0');
				if(isAnimating) {
					return false;
				}
				if(current !== nextPageIndex) {		//?? why I can not use 'index' paramenter of callback function
					nextPage(nextPageIndex);
				}
			};
		});	

		$albumOptions.each(function(index, el) {
			el.onclick = function() {				
				var nextPageIndex = (el.getAttribute('option-index')[0] - '0');
				if(isAnimating) {
					return false;
				}
				if(current !== nextPageIndex) {	
					nextPage(nextPageIndex);
				}
			};
		});	

		$blogOptions.each(function(index, el) {
			el.onclick = function() {				
				var nextPageIndex = (el.getAttribute('option-index')[0] - '0');
				if(isAnimating) {
					return false;
				}
				if(current !== nextPageIndex) {	
					nextPage(nextPageIndex);
				}
			};
		});	
	}

	function nextPage(targetPageIndex) {
		if( isAnimating ) {
			return false;
		}

		isAnimating = true;
		
		var $currPage = $pages.eq( current );		//current page index

		current = targetPageIndex;

		var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),		//add css to current view,Very important!
		outClass = '', inClass = '';

		outClass = 'pt-page-scaleDown';
		inClass = 'pt-page-scaleUpDown pt-page-delay300';

		$currPage.addClass( outClass ).on( animEndEventName, function() {		//"webkitAnimationEnd" is the event of animation end
			$currPage.off( animEndEventName );			//????
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}
	}

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
	}

	init();

	return { 
		init : init,
		nextPage : nextPage,
	};
})();