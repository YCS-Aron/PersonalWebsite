/**
 * JS file to implement the animation of sidebar transition
 * http://www.codrops.com
 */
 var SidebarMenuEffects = (function() {
 	var container = document.getElementById( 'st-container' );

 	function hasParentClass( e, classname ) {
		if(e === document) return false;
		if( classie.has( e, classname ) ) {
			return true;
		}
		return e.parentNode && hasParentClass( e.parentNode, classname );
	}

	function isMenuOpen() {
		return container.className.indexOf('st-menu-open') >= 0;
	}

	function init() {
		var resetMenu = function() {
				classie.remove( container, 'st-menu-open' );
			},
			bodyClickFn = function(evt) {
				if( !hasParentClass( evt.target, 'st-menu' ) ) {
					resetMenu();										
					document.removeEventListener( 'click', bodyClickFn );
				}
			};
			menuToggleButton = $('#st-trigger-effects button.open-aside-button');

		menuToggleButton[0].addEventListener( 'click', function( ev ) {
			if(!isMenuOpen()) {
				ev.stopPropagation();
				ev.preventDefault();
				container.className = 'st-container'; 
				classie.add( container, 'st-effect-7');		//set animation type to effect 7
				setTimeout( function() {
					classie.add( container, 'st-menu-open' );
				}, 25 );
				document.addEventListener( 'click', bodyClickFn );
			}
		});
	}
	init();
})();