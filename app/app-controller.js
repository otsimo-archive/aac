import { deviceType } from "./js/utils";
import * as CONSTANT from "./js/constants";

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
   * @param {ConjunctionManager} ConjunctionManager
   * @param {OtsimoHandler} OtsimoHandler
   *
   * @memberOf AppController
   */
  constructor(
    $scope,
    $global,
    $http,
    TTSManager,
    OtsimoHandler,
    ConjunctionManager,
  ) {
    console.log("APP MOUNTED");
    this.$scope = $scope;
    this.$scope.global = $global;
    this.$http = $http;
    this.tts = TTSManager;
    this.conj = ConjunctionManager;
    this.otsimo = OtsimoHandler.init();
    // Initilize variables for controller.

    // Call controllerInit
    this.controllerInit();
  }

  controllerInit() {
    // Create or facilitate new functions for $scope or $global service.
    this.otsimo.run(() => {
      const splash = document.getElementById("splash");
      if (splash) {
        splash.remove();
      }
      this.setSettings();
      this.runApp();
      // Open in the respectful mode to height and width.
      this.initOrientationCheck(this.otsimo.width, this.otsimo.height, 1);
    });

    // Listen the changes on the resolution and
    // orientation from the device.
    this.resolutionListener();
  }

  /**
   * Does the inital tasks to start the app.
   */
  runApp() {
    // Get grid size X and Y from otsimo settings object.
    let otsGridSize = this.otsimo.settings.gridsize.split("grid-")[1];
    let otsGridXY = otsGridSize.split("x");
    let x = otsGridXY[0];
    let y = otsGridXY[1];
    // Check if the device is a phone
    // Limit the grid size to 6x4
    if (deviceType() === "phone") {
      if (x > 6) {
        x = 6;
      }
      if (y > 4) {
        y = 4;
      }
    }
    // Set grid size and check device orientation.
    this.changeGridSize(x, y);
    if (this.otsimo.width < this.otsimo.height) {
      this.checkOrientation(CONSTANT.PORTRAIT);
    } else {
      this.checkOrientation(CONSTANT.LANDSCAPE_LEFT);
    }

    // Load symbol data to global array variable.
    this.loadSymbols();
  }

  /**
   * Sets the setting properties fron otsimo object
   *
   */
  setSettings() {
    this.$scope.global.language = this.otsimo.child.language;
    // Colors & styles
    this.$scope.headerColor = this.otsimo.kv.headerColor;
    this.$scope.generalFont = this.otsimo.kv.generalFont;
    let header = document.getElementById("header");
    if (header) {
      header.style.background = this.$scope.headerColor;
      document.body.style.fontSize = this.$scope.generalFont;
    }

    this.setUIText();
  }

  /**
   * Loads symbol package respect to language
   *
   */
  loadSymbols() {
    const global = this.$scope.global;
    const symbolPackPath = this.otsimo.kv.symbolPack;
    const metadataPath = `${symbolPackPath}/metadata.json`;

    this.$http.get(metadataPath).then(
      resp => {
        this.metadata = resp.data;
        global.symbolPath = `${symbolPackPath}/${resp.data.images}`;
        this.tts.setVoiceDriver(resp.data.voiceId);

        const symbolDataPath = `${symbolPackPath}/${resp.data.data}`;

        this.$http.get(symbolDataPath).then(
          resp => {
            global.mainArray = resp.data.symbols;
            this.initExtendedSymbols();
            global.changeCurrentTab(CONSTANT.TAB_MAIN);
          },
          err => {
            console.log(err);
          },
        );
      },
      err => {
        console.log(err);
      },
    );
  }

  /**
   * Initilizes the extended symbol array for phrase view.
   *
   */
  initExtendedSymbols() {
    let global = this.$scope.global;
    if (global.mainArray) {
      global.mainArray.forEach(objMirror => {
        let obj = JSON.parse(JSON.stringify(objMirror));
        global.extendedArray.push(obj);
        // Extend synonyms
        if (obj.synonym.length) {
          obj.synonym.forEach(s => {
            obj.title = s;
            let pushObj = JSON.parse(JSON.stringify(obj));
            global.extendedArray.push(pushObj);
          });
        }
        let lang = this.$scope.global.language;
        // Extend conjuncted verbs
        if (obj.type == "verb") {
          let possessors = this.conj.poss;
          let conjtypes = this.conj.conjtype;
          possessors.forEach(p => {
            conjtypes.forEach(c => {
              obj.title = this.conj.conjVerb(obj.slug, c, p);
              let pushObj = JSON.parse(JSON.stringify(obj));
              global.extendedArray.push(pushObj);
            });
          });
        }
        // extend conjuncted nouns
        if (obj.type == "noun") {
          let nounConditions = this.conj.nounCondition;

          nounConditions.forEach(c => {
            obj.title = this.conj.conjNoun(obj.slug, c);
            let pushObj = JSON.parse(JSON.stringify(obj));
            global.extendedArray.push(pushObj);
          });
        }
      });
    }
    // BUG: extendeArray is not initilizing
    global.extendedArray.forEach(ext => {
      let cleanTitle = ext.title.replaceAll("-", " ");
      global.extendedTitleArray.push(cleanTitle);
      global.extendedSlugArray.push(ext.slug);
      global.extendedSlugMap[cleanTitle] = ext.slug;
    });
  }

  /**
   * Sets UI text setting properties from otsimo kv object
   *
   */
  setUIText() {
    let otsKV = this.otsimo.kv;
    let sc = this.$scope;
    sc.pageText1 = otsKV.pageText1;
    sc.pageText2 = otsKV.pageText2;
    sc.pageText3 = otsKV.pageText3;
    sc.pageText4 = otsKV.pageText4;
    sc.pageText5 = otsKV.pageText5;
    sc.timeIntervalText1 = otsKV.timeIntervalText1;
    sc.timeIntervalText2 = otsKV.timeIntervalText2;
    sc.timeIntervalText3 = otsKV.timeIntervalText3;
    sc.timeIntervalText4 = otsKV.timeIntervalText4;
    sc.previousText = otsKV.previousText;
    sc.nextText = otsKV.nextText;
    sc.backText = otsKV.backText;
    sc.removeHoldColor = otsKV.removeHoldColor;
    sc.removeNormalColor = otsKV.removeNormalColor;
    sc.startTyping = otsKV.startTyping;
  }

  /**
   * Listens any resolution changes
   *
   */
  resolutionListener() {
    this.otsimo.onResolutionChanged((width, height, orientation) => {
      this.initOrientationCheck(width, height, 0);
      this.$scope.$apply();
    });
  }

  initOrientationCheck(width, height, init) {
    if (init) {
      this.checkOrientation(CONSTANT.LANDSCAPE_LEFT);
    } else {
      if (width < height) {
        this.checkOrientation(CONSTANT.PORTRAIT);
      } else {
        this.checkOrientation(CONSTANT.LANDSCAPE_LEFT);
      }
    }
  }

  /**
   * Initilizes the grid size by given X,Y variables.
   * @param {number} gridX number of grid item on horizontal
   * @param {number} gridY number of grid item on vertical
   */
  changeGridSize(gridX, gridY) {
    let global = this.$scope.global;
    global.gridSize = [gridX, gridY];
    global.gridSizeStatic = [gridX, gridY];
    global.gridQuantity = gridX * gridY;
  }

  /**
   * Updates the gridSize with respect to current
   * Orientation type.
   * Eg: if orientation changes, then change gridSize as; X-Y => Y=X
   * @param {string} orientation Orientation name
   */
  checkOrientation(orientation) {
    let gridSizeTemp = this.$scope.global.gridSizeStatic;
    let x = gridSizeTemp[0];
    let y = gridSizeTemp[1];
    let theGridSize;
    if (orientation) {
      // In production
      if (
        orientation === CONSTANT.PORTRAIT ||
        orientation === CONSTANT.UPSIDE_DOWN
      ) {
        theGridSize = [y, x];
      } else if (
        orientation === CONSTANT.LANDSCAPE_LEFT ||
        orientation === CONSTANT.LANDSCAPE_RIGHT
      ) {
        theGridSize = [x, y];
      }
    } else {
      // In development
      if (typeof screen.orientation !== "undefined") {
        if (screen.orientation.type === CONSTANT.PORTRAIT_PRIMARY) {
          theGridSize = [y, x];
        } else if (screen.orientation.type === CONSTANT.LANDSCAPE_PRIMARY) {
          theGridSize = [x, y];
        }
      } else {
        theGridSize = [x, y];
      }
    }
    this.$scope.global.gridSize = theGridSize;
    //this.$scope.$apply();
  }
}
// Service Dependency Injection
AppController.$inject = [
  "$scope",
  "$global",
  "$http",
  "TTSManager",
  "OtsimoHandler",
  "ConjunctionManager",
];
