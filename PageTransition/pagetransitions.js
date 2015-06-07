var PageTransitions = (function() {

	var $pages = $( 'div.pt-page' ),
		pagesCount = $pages.length,
		$iterate = $( '.transitionbutton' ),
		animcursor = 1,
		current = 0,   //TO DO:this is not index attribute
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd17',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations,
		pageStack = [];
	
	function init() {

		$pages.each( function() {
			var $page = $( this );
			//Save data into DOM
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

		//Make init page show
		$pages.filter('[index=' + current + ']').addClass( 'pt-page-current' );

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

		var escHandler = function(k) {
			var keyCode = k.keyCode;
			if(keyCode === 8) {
				if(pageStack.length !== 0) {
					$(document.body).off('keyup', escHandler);
					setTimeout(function() {
						$(document.body).on('keyup', escHandler);
					}, 2000);
					nextPage(pageStack.pop(), true);
				}
			}
		};

		$(document.body).on('keyup', escHandler);
	}

	function nextPage(nextPageIndex, isRollback) {
		isAnimating = true;

		if(!isRollback) {
			pageStack.push(current);
		}
		
		var $currPage = $pages.filter('[index=' + current + ']');

		current = nextPageIndex;

		// var $nextPage = $pages.eq( nextPageIndex ).addClass( 'pt-page-current' );
		var $nextPage = $pages.filter('[index=' + current + ']').addClass( 'pt-page-current' );
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