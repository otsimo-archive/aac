import { turkishConjunctor } from '../../js/fiil';
import { englishConjunctor } from '../../js/verb';
import { updateCurrentPhraseScroll } from '../../js/utils';
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
	 * @param {TTSManager} TTSManager
	 *
	 * @memberOf SymbolController
	 */
	constructor($scope, $http, $timeout, $global, EventManager, TTSManager) {
		this.$scope = $scope;
		this.$scope.global = $global;
		this.$timeout = $timeout;
		this.events = EventManager;
		this.tts = TTSManager;

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
			}
			this.clickAnimStop();
		}, 300);
		this.clickAnimStart(index);
	}

	openVerbConjunction(wordObj) {
		this.conjArr = [];
		let language = this.$scope.global.language;
		if (language == "tr") {
			CONSTANT.CONJTYPE[language].forEach(c => {
				let conjable = {
					title: turkishConjunctor(wordObj.title, c),
					tence: c
				};
				this.conjArr.push(conjable);
			});
		} else if (language == "en") {
			CONSTANT.CONJTYPE[language].forEach(c => {
				let conjable = {
					title: englishConjunctor(wordObj.title, c),
					tence: c
				};
				this.conjArr.push(conjable);
			});
		}
		document.getElementById("verbConj").style.display = "block";
	}

	clickConjuncted(wordTitle, tence) {
		let wordObj = {};
		wordObj.title = wordTitle;
		console.log(wordObj.title);
		console.log(tence);
		wordObj.slug = this.$scope.global.extendedSlugMap[wordTitle];
		wordObj.type = "verb";
		wordObj.tence = tence;
		this.$scope.global.pushToCurrentPhrase(wordObj);
		this.tts.speak(wordObj.title);
		document.getElementById("verbConj").style.display = "none";
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
			if (wordObj.type == "verb") {
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
		this.$scope.global.pushToCurrentPhrase(wordObj);
		updateCurrentPhraseScroll();
		this.tts.speak(wordObj.title);
		this.events.appWord(wordObj.title, this.$scope.global.gridSize[0], this.$scope.global.gridSize[1]);
	}
}

// Service Dependency Injection
SymbolController.$inject = ['$scope', '$http', '$timeout', '$global', 'EventManager', 'TTSManager'];
