window.onload = function() {stickyHeader()};
window.onresize = function() {stickyHeader()};

var header = document.getElementById('header');
var content = document.getElementById('content')

function stickyHeader() {
	var height = `${header.offsetHeight + 50}px`;
	content.style.marginTop = height;
}