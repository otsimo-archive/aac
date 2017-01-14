/*
  - global.js
  A Service for the whole app to share global variables and functions.
*/

export default class Global {
	constructor() {
		this.currentPhrase = [];
		this.mainArray = [];
		this.extendedArray = [];
		this.extendedTitleArray = [];
		this.extendedSlugArray = [];
		this.extendedSlugMap = [];
		this.phraseIndex = 1;
		this.isHome = 1;
		this.currentTab = '';
		this.currentPage = '';
		this.currentDerivable = '';
		this.currentGroup = '';
		this.gridSize = [0, 0];
		this.gridSizeStatic = [0, 0];
		this.gridQuantity = 0;
		this.isDraggable = true;
	}
}
