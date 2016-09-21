import { deviceType } from './js/utils';
import * as CONSTANT from './js/constants';
/**
 *
 * @class AppController
 */
export default class AppController {
  /**
   * Creates an instance of AppController.
   *
   * @param {any} $scope
   * @param {any} $global
   * @param {angular.IHttpService} $http
   * @param {TTSManager} TTSManager
   *
   * @memberOf AppController
   */
  constructor($scope, $global, $http, TTSManager) {
    this.$scope = $scope;
    this.$scope.global = $global;
    this.$http = $http;
    this.tts = TTSManager;
    // Initilize variables for controller.

    // Call controllerInit
    this.controllerInit();
  }

  controllerInit() {
    // Create or facilitate new functions for $scope or $global service.
    otsimo.run(() => {

      this.checkCapabilities();
      this.setSettings();
      this.runApp();

      // Listen the changes on the resolution and
      // orientation from the device.
      this.resolutionListener();

    });
  }

  /**
   * Does the inital tasks to start the app.
   */
  runApp() {
    // Get grid size X and Y from otsimo settings object.
    let otsGridSize = otsimo.settings.gridsize.split('grid-')[1];
    let otsGridXY = otsGridSize.split('x');
    let x = otsGridXY[0];
    let y = otsGridXY[1];
    // Check if the device is a phone
    // Limit the grid size to 6x4
    if (deviceType() === 'phone') {
      if (x > 6) { x = 6; }
      if (y > 4) { y = 4; }
    }
    // Set grid size and check device orientation.
    this.$scope.global.changeGridSize(x, y);
    this.$scope.global.checkOrientation();

    // Load symbol data to global array variable.
    this.loadSymbols();
  }

  /**
   * Sets the setting properties fron otsimo object
   *
   */
  setSettings() {

    this.$scope.global.language = otsimo.child.language;
    // Colors & styles
    this.$scope.headerColor = otsimo.kv.headerColor;
    this.$scope.generalFont = otsimo.kv.generalFont;
    document.getElementById('header')
      .style.background = this.$scope.headerColor;
    document.body.style.fontSize = this.$scope.generalFont;

    this.setUIText();

  }

  /**
   * Loads symbol package respect to language
   *
   */
  loadSymbols() {
    let global = this.$scope.global;
    let metadataPath = `${otsimo.kv.symbolPack}/metadata.json`;
    this.$http.get(metadataPath)
      .success((resp) => {
        this.metadata = resp;
        global.symbolPath = `${otsimo.kv.symbolPack}/${resp.images}`;
        this.tts.setVoiceDriver(resp.voiceId);

        let symbolDataPath = `${otsimo.kv.symbolPack}/${resp.data}`

        this.$http.get(symbolDataPath)
          .success(resp => {
            global.mainArray = resp.symbols;
            global.changeCurrentTab(CONSTANT.TAB_MAIN);
          })
          .error(console.error)
      })
      .error(console.error);
  }

  /**
   * Checks if the device or installed otsimo app is supporting TTS.
   *
   */
  checkCapabilities() {
    if (otsimo.capabilities.indexOf('tts') === -1) {
      document.getElementById('outdated')
        .style.display = 'block';
    }
  }

  /**
   * Sets UI text setting properties from otsimo kv object
   *
   */
  setUIText() {
    this.$scope.pageText1 = otsimo.kv.pageText1;
    this.$scope.pageText2 = otsimo.kv.pageText2;
    this.$scope.pageText3 = otsimo.kv.pageText3;
    this.$scope.pageText4 = otsimo.kv.pageText4;
    this.$scope.timeIntervalText1 = otsimo.kv.timeIntervalText1;
    this.$scope.timeIntervalText2 = otsimo.kv.timeIntervalText2;
    this.$scope.timeIntervalText3 = otsimo.kv.timeIntervalText3;
    this.$scope.timeIntervalText4 = otsimo.kv.timeIntervalText4;
    this.$scope.previousText = otsimo.kv.previousText;
    this.$scope.nextText = otsimo.kv.nextText;
    this.$scope.backText = otsimo.kv.backText;
  }

  /**
   * Listens any resolution changes
   *
   */
  resolutionListener() {
    otsimo.onResolutionChanged((width, height, orientation) => {
      this.$scope.global.checkOrientation(orientation);
    });
  }

}
