if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
	$('body').on("mousewheel", function () {
		event.preventDefault();
		var wd = event.wheelDelta;
		var csp = window.pageYOffset;
		window.scrollTo(0, csp - wd);
	});
}