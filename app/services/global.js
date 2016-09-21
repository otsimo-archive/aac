/*
  - global.js
  A Service for the whole app to share global variables and functions.
*/

export default class Global {
  constructor() {
    this.currentPhrase = [];
    this.mainArray = [];
    this.mainSlugArray = [];
    this.isHome = 1;
    this.currentTab = '';
    this.currentPage = '';
    this.currentDerivable = '';
    this.currentGroup = '';
    this.gridSize = [0, 0];
    this.gridSizeStatic = [0, 0];
    this.gridQuantity = 0;
  }
}
