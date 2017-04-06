import {updateCurrentPhraseScroll} from '../../js/utils';
import * as CONSTANT from '../../js/constants';

/**
 * The SymbolController
 * @export
 * @class SymbolController
 */
export default class SymbolController {
    /**
	 * Creates an instance of SymbolController.
	 *
	 * @param {any} $scope
	 * @param {any} $http
	 * @param {any} $timeout
	 * @param {any} $global
	 * @param {EventManager} EventManager
	 *
	 * @memberOf SymbolController
	 */
    constructor($scope, $http, $timeout, $global, EventManager, ConjunctionManager) {
        this.$scope = $scope;
        this.$scope.global = $global;
        this.$timeout = $timeout;
        this.events = EventManager;
        this.conj = ConjunctionManager;
        // Initilize variables for controller.
        this.wordTouchTimer = null;
        this.currentlyHolding = null;

    }

    /**
	 * Called when user starts touch action.
	 * Handles hold actions if user holds on symbol 300ms
	 * @param {Object} wordObj
	 * @param {number} index
	 */
    wordTouchStart(wordObj, index) {
        this.currentlyHolding = wordObj.title;
        this.wordTouchTimer = this.$timeout(() => {
            if (wordObj.class === CONSTANT.CLASS_DERIVABLE) {
                this.$scope.global.currentDerivable = wordObj.slug;
                this.events.appDerive(wordObj.slug);
                this.$scope.global.changeCurrentTab(CONSTANT.TAB_DERIVABLE);
            } else if (wordObj.class === CONSTANT.CLASS_GROUP) {
                this.$scope.global.currentGroup = wordObj.slug;
                this.$scope.global.changeCurrentTab(CONSTANT.TAB_GROUP);
                /*
				Category animation killing in touchEnd:
				*/
            } else if (wordObj.type === "verb") {
                this.openVerbConjunction(wordObj);
            } else if (wordObj.type === "noun") {
                this.openNounConjunction(wordObj);
            }
            this.clickAnimStop();
        }, 300);
        this.clickAnimStart(index);
    }

    openVerbConjunction(wordObj) {
        this.conjArr = [];
        this.conj.conjtype.forEach(c => {
            let conjable = {
                title: this.conj.conjVerb(wordObj.title, c),
                tence: c
            };
            this.conjArr.push(conjable);
        });
        document.getElementById("verbConj").style.display = "block";
    }

    openNounConjunction(wordObj) {
        this.nounConjArr = [];
        this.conj.nounCondition.forEach(c => {
            let conjable = {
                title: this.conj.conjNoun(wordObj.title, c),
                condition: c
            };
            this.nounConjArr.push(conjable);
        });
        document.getElementById("nounConj").style.display = "block";
    }

    clickConjuncted(wordTitle, tence) {
        let wordObj = {};
        wordObj.title = wordTitle;
        wordObj.slug = this.$scope.global.extendedSlugMap[wordTitle];
        wordObj.type = "verb";
        wordObj.tence = tence;
        this.$scope.global.pushToCurrentPhrase(wordObj, true);
    }

    clickNounConjuncted(nounTitle, condition) {
        let wordObj = {};
        wordObj.title = nounTitle;
        wordObj.slug = this.$scope.global.extendedSlugMap[nounTitle];
        wordObj.type = "noun";
        wordObj.condition = condition;
        this.$scope.global.pushToCurrentPhrase(wordObj, true);
    }

    closeConjMenu() {
        let verbMenu = document.getElementById("verbConj");
        if (verbMenu) {
            verbMenu.style.display = "none";
        }
    }

    closeNounConjMenu() {
        let nounMenu = document.getElementById("nounConj");
        if (nounMenu) {
            nounMenu.style.display = "none";
        }
    }

    /**
	 * Called when user ends touch event.
	 * Cancels the onhold actions when touch canceled before 300ms
	 * @param {Object} wordObj
	 * @param {number} index
	 */
    wordTouchEnd(wordObj, index) {
        this.$timeout.cancel(this.wordTouchTimer);
        if (this.currentlyHolding === wordObj.title && wordObj.class !== CONSTANT.CLASS_GROUP) {
            if (wordObj.type == "verb" || wordObj.type == "noun") {
                if (this.wordTouchTimer.$$state.status == 2) {
                    this.clickWord(wordObj);
                }
            } else {
                this.clickWord(wordObj);
            }
        }
        if (wordObj.class === 'group') {
            this.$scope.global.currentGroup = wordObj.slug;
            this.$scope.global.changeCurrentTab(CONSTANT.TAB_GROUP);
        }
        this.clickAnimEnd(index);
    }

    /**
	 * Starts click animation by adding className to the symbol with given index
	 * @param {number} index
	 */
    clickAnimStart(index) {
        let elem = document.getElementById('item-' + index);
        if (elem) {
            elem.className = elem.className + ' gridItemClick';
        }
        this.$scope.currentAnimIndex = index;
    }

    /**
	 * Reverses click animation by removing className to the symbol with given index
	 * @param {number} index
	 */
    clickAnimEnd(index) {
        let elem = document.getElementById('item-' + index);
        if (elem) {
            elem.className = elem.className.replace(' gridItemClick', '');
        }
    }

    /**
	 * Cancels the animation for all symbol grids.
	 * Kills transition by adding a className (transitionKill)
	 */
    clickAnimStop() {
        let elem = document.getElementById('item-' + this.$scope.currentAnimIndex);
        if (elem) {
            elem.className = elem.className.replace(' gridItemClick', '') + ' transitionKill';
            this.$timeout(() => elem.className = elem.className.replace(' transitionKill', ''), 101);
        }
    }

    /**
	 * Pushes the symbol object to current phrase
	 * Sends word's string to device's TTS Service.
	 * @param {Object} wordObj
	 */
    clickWord(wordObj) {
        this.$scope.global.pushToCurrentPhrase(wordObj, true);
        updateCurrentPhraseScroll();
        this.events.appWord(wordObj.title, this.$scope.global.gridSize[0], this.$scope.global.gridSize[1]);
    }
}

// Service Dependency Injection
SymbolController.$inject = [
    '$scope',
    '$http',
    '$timeout',
    '$global',
    'EventManager',
    'ConjunctionManager'
];
