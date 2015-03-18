(function() {
	var buttons = $('.drop-menu .drop-menu-option .drop-menu-button');
	var length = buttons.length;

	for(var i = 0; i<length; i++) {
		buttons[i].addEventListener("click", function() {
			var optionsList = $(this).parent().find('.options-list');			//  $(buttons[i]) 转换为jQuery对象，从而使用parent方法
			var buttonIcon = $(this).find('.toggle-icon');

			if(optionsList.length) {
				var handler = function () {				//this handler should handle both case when show or hide
					if(classie.hasClass(optionsList[0], 'toggle-hidden')) {
						optionsList.css('display', 'none');				//!!!!!!!! closure contruct in environment
					}												
				};

				if(optionsList.css('display') === 'none') {
					optionsList.css('display', 'block');			
					if(classie.hasClass(optionsList[0], 'toggle-hidden')) {			//convert form jq object to js object
						classie.removeClass(optionsList[0], 'toggle-hidden');	
					}
					classie.addClass(optionsList[0], 'toggle-show');

					//handle icon
					if(classie.hasClass(buttonIcon[0], 'toggle-hidden-icon')) {
						classie.removeClass(buttonIcon[0], 'toggle-hidden-icon');
					}
					classie.addClass(buttonIcon[0], 'toggle-show-icon');
				} else {
					if(classie.hasClass(optionsList[0], 'toggle-show')) {
						classie.removeClass(optionsList[0], 'toggle-show');	
					}
					classie.addClass(optionsList[0], 'toggle-hidden');
					optionsList[0].addEventListener("webkitAnimationEnd", handler);

					//handle icon
					if(classie.hasClass(buttonIcon[0], 'toggle-show-icon')) {
						classie.removeClass(buttonIcon[0], 'toggle-show-icon');
					}
					classie.addClass(buttonIcon[0], 'toggle-hidden-icon');
				}
			}
		});
	}
})();