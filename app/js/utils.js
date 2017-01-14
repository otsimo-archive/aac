/*
  -- utils.js
  This file contains generic functions for other javascript files to use.
  Like returnTime(), capitalize() etc.

*/

/**
 * Get unix time
 * @returns {number}
 */
export function returnTime() {
	let d = new Date();
	return d.getTime();
}

/**
 * Updates the current phrase's scroll amount
 * called after a new word pushed to current phrase
 */
export function updateCurrentPhraseScroll() {
	let element = document.getElementById('cPhrase');
	if (element) {
		setTimeout(() => {
			element.scrollLeft = element.scrollWidth;
		}, 1);
	}
}

/**
 * capitalize first letter
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
	return str.charAt(0)
		.toLocaleUpperCase() + str.slice(1);
}


/**
 * Find the device the types
 *
 * @param {number} w Width
 * @param {number} h Height
 * @returns {string} the device types which can be 'phone' or 'tablet'
 */
export function deviceType(w, h) {
	let type;
	let total;
	if (w && h) {
		total = w + h;
	} else {
		total = window.innerWidth + window.innerHeight;
	}

	if (total < 1500) {
		type = 'phone';
	} else {
		type = 'tablet';
	}
	return type;
}
