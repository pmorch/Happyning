function toggleBid(bidID) {
	var $details = $('#bidDetails' + bidID);
	// var $img = $('#expandImg' + imgID);
	$details.toggle('slow');
}
window.template = function (selector, col) {
	var str = $(selector).html() || $(selector).text();

	col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);

	return str.replace(/\{([^{}]+)\}/gm, function () {
		return col[arguments[1]] === undefined ? arguments[0] : col[arguments[1]];
	});
};
