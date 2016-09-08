//ie fixer a
var flag_ie = false;
if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
	flag_ie = true;
	$('body').on("mousewheel", function () {
		event.preventDefault();
		var we = event.wheelDelta;
		var csp = window.pageYOffset;
		window.scrollTo(0, csp - we);
	});
}


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

if(!flag_ie)
(function(win, d) {

  var $ = d.querySelector.bind(d);

  var wd0 = $('#widget_0');

  var ticking = false;
  var lastScrollY = 0;

  function onResize () {
    updateElements(win.pageYOffset);
  }

  function onScroll (evt) {

    if(!ticking) {
      ticking = true;
      requestAnimFrame(updateElements);
      lastScrollY = win.pageYOffset;
    }
  }

  function updateElements () {

    var relativeY = lastScrollY / 1200;
    
    prefix(wd0.style, "Transform", "translate3d(0," +(parseInt(relativeY*400)) + 'px, 0)');

    ticking = false;
  }

  function pos(base, range, relY, offset) {
    return base + limit(0, 1, relY - offset) * range;
  }

  function prefix(obj, prop, value) {
    var prefs = ['webkit', 'Moz', 'o', 'ms'];
    for (var pref in prefs) {
      obj[prefs[pref] + prop] = value;
    }
  }

  function limit(min, max, value) {
    return Math.max(min, Math.min(max, value));
  }

  (function() {

    updateElements(win.pageYOffset);
  })();

  win.addEventListener('resize', onResize, false);
  win.addEventListener('scroll', onScroll, false);

})(window, document);