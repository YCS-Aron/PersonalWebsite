(function() {
	var uls = $('form.me-select > ul');
	for(var i = 0;i < uls.length;i++) {
		var lis = $(uls[i]).find('li');
		for(var j = 0;j < lis.length;j++) {
			if($(lis[j].firstChild).attr('checked') === 'checked') {
				classie.addClass(lis[j], 'selected');
			}

			lis[j].onclick = function () {
				if(classie.hasClass(this, 'selected') && !this.firstChild.checked) {
					classie.removeClass(this, 'selected');
				} else {
					classie.addClass(this, 'selected');
				}
			};
		}
	}

})();