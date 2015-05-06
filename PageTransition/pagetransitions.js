var PageTransitions = (function() {

	var $pages = $( 'div.pt-page' ),
		pagesCount = $pages.length,
		$iterate = $( '.transitionbutton' ),
		animcursor = 1,
		current = 9,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations;
	
	function init() {

		$pages.each( function() {
			var $page = $( this );
			//Save data into DOM
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

		//Make init page show
		$pages.eq( current ).addClass( 'pt-page-current' );

		//click event on "Next page" button
		var transitionButtons = $('.transitionbutton');
		for(var i = 0;i < transitionButtons.length; i++) {
			$(transitionButtons[i]).on('click', function(){
				var nextPageIndex = parseInt($(this).attr('targetIndex'));
				if(current !== nextPageIndex) {
					nextPage(nextPageIndex);
				}
			});
		}
	}

	function nextPage(nextPageIndex) {
		isAnimating = true;
		
		var $currPage = $pages.eq( current );

		current = nextPageIndex;

		// var $nextPage = $pages.eq( nextPageIndex ).addClass( 'pt-page-current' );
		var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' );
		var outClass = '', inClass = '';


		outClass = 'pt-page-scaleDown';
		inClass = 'pt-page-moveFromRight';


		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
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