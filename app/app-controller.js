import {
    deviceType
} from './js/utils';
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
     * @param {ConjunctionManager} ConjunctionManager
     * @param {OtsimoHandler} OtsimoHandler
     *
     * @memberOf AppController
     */
    constructor($scope, $global, $http, TTSManager, ConjunctionManager, OtsimoHandler) {
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

            this.checkCapabilities();
            this.setSettings();
            this.runApp();
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
        let otsGridSize = this.otsimo.settings.gridsize.split('grid-')[1];
        let otsGridXY = otsGridSize.split('x');
        let x = otsGridXY[0];
        let y = otsGridXY[1];
        // Check if the device is a phone
        // Limit the grid size to 6x4
        if (deviceType() === 'phone') {
            if (x > 6) {
                x = 6;
            }
            if (y > 4) {
                y = 4;
            }
        }
        // Set grid size and check device orientation.
        this.$scope.global.changeGridSize(x, y);
        if (this.otsimo.width < this.otsimo.height) {
            this.$scope.global.checkOrientation(CONSTANT.PORTRAIT);
        } else {
            this.$scope.global.checkOrientation(CONSTANT.LANDSCAPE_LEFT);
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
        let header = document.getElementById('header');
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
        let global = this.$scope.global;
        let symbolPackPath = this.otsimo.kv.symbolPack;
        let metadataPath = `${symbolPackPath}/metadata.json`;
        console.log("Symbol Pack: " + symbolPackPath);
        this.$http.get(metadataPath)
            .then(resp => {
                this.metadata = resp.data;
                global.symbolPath = `${symbolPackPath}/${resp.data.images}`;
                this.tts.setVoiceDriver(resp.data.voiceId);

                let symbolDataPath = `${symbolPackPath}/${resp.data.data}`;

                this.$http.get(symbolDataPath)
                    .then(resp => {
                        global.mainArray = resp.data.symbols;
                        this.initExtendedSymbols();
                        global.changeCurrentTab(CONSTANT.TAB_MAIN);
                    }, err => {
                        console.log(err);
                    });
            }, err => {
                console.log(err);
            });
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
                    let possessors = CONSTANT.POSS[lang];
                    if (lang == "tr") {
                        possessors.forEach(p => {
                            CONSTANT.CONJTYPE[lang].forEach(c => {
                                obj.title = this.conj.conjTurkish(obj.slug, c, p);
                                let pushObj = JSON.parse(JSON.stringify(obj));
                                global.extendedArray.push(pushObj);
                            });
                        });
                    } else if (lang == "en") {
                        //Set english verb conjunction.
                        possessors.forEach(p => {
                            CONSTANT.CONJTYPE[lang].forEach(c => {
                                obj.title = this.conj.conjEnglish(obj.slug, c, p);
                                let pushObj = JSON.parse(JSON.stringify(obj));
                                global.extendedArray.push(pushObj);
                            });
                        });
                    }
                }
                // extend conjuncted nouns
                if (obj.type == "noun") {
                    if (CONSTANT.NOUN_CONDITION[lang]) {
                        CONSTANT.NOUN_CONDITION[lang].forEach(c => {
                            if (lang == "tr") {
                                obj.title = this.conj.conjNounTr(obj.slug, c);
                            } else if (lang == "en") {
                                obj.title = this.conj.conjNounEn(obj.slug, c);
                            }
                            let pushObj = JSON.parse(JSON.stringify(obj));
                            global.extendedArray.push(pushObj);
                        });
                    }
                }
            });
        }
        global.extendedArray.forEach(ext => {
            global.extendedTitleArray.push(ext.title);
            global.extendedSlugArray.push(ext.slug);
            let cleanTitle = ext.title.replaceAll("-", " ");
            global.extendedSlugMap[cleanTitle] = ext.slug;
        });
    }

    /**
     * Checks if the device or installed otsimo app is supporting TTS.
     *
     */
    checkCapabilities() {
        if (this.otsimo.capabilities.indexOf('tts') === -1) {
            document.getElementById('outdated').style.display = 'block';
        }
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
            if (width < height) {
                this.$scope.global.checkOrientation(CONSTANT.PORTRAIT);
            } else {
                this.$scope.global.checkOrientation(CONSTANT.LANDSCAPE_LEFT);
            }
        });
    }

}
// Service Dependency Injection
AppController.$inject = ['$scope', '$global', '$http', 'TTSManager', 'ConjunctionManager', 'OtsimoHandler'];
