document.ontouchmove = function(event) {
	// event.preventDefault();
	// Need to solve this.
}

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

if (!localStorage.phraseHistory) {
	console.log('LS: not yet initilized, firstTime load.');
	localStorage.phraseHistory = '[]';
}

Array.prototype.contains = function(obj) {
	return this.indexOf(obj) > -1;
};

String.prototype.contains = function(it) {
	return this.indexOf(it) != -1;
};

String.prototype.replaceAll = function(search, replace) {
	if (replace === undefined) {
		return this.toString();
	}

	return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};
