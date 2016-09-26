/**
 * PhraseController
 * @export
 * @class PhraseController
 */
export default class PhraseController {
  /**
   * Creates an instance of PhraseController.
   *
   * @param {any} $scope
   * @param {any} $global
   * @param {any} $timeout
   * @param {EventManager} EventManager
   * @param {TTSManager} TTSManager
   * @param {LSManager} LSManager
   */
  constructor($scope, $global, $timeout, EventManager, TTSManager, LSManager) {
      this.$scope = $scope;
      this.$scope.global = $global;
      this.$timeout = $timeout;
      this.events = EventManager;
      this.tts = TTSManager;
      this.ls = LSManager;
      // Initilize variables for controller.
      this.bstouchTimer = null;
      this.dragListener = {
        allowDuplicates: true,
      }

      // Call controllerInit
      this.controllerInit();
    }
    /**
     * Create or facilitate new functions for $scope or $global service.
     */
  controllerInit() {}

  /**
   * Remove Last Word from the current phrase.
   */
  removeLastWord() {
      this.$scope.global.currentPhrase.pop();
    }
    /**
     * Submit - Save to History - Play the current phrase.
     */
  submitPhrase() {
      if (this.$scope.global.currentPhrase.length > 0) {
        let i = 0;
        let currentPhraseString = '';
        this.$scope.currentPhraseTransition = 'cpTransition';
        this.ls.addPhrase2History(this.$scope.global.currentPhrase);

        this.$timeout(() => this.$scope.currentPhraseTransition = '', 300);
        while (i < this.$scope.global.currentPhrase.length) {
          currentPhraseString = currentPhraseString + this.$scope.global.currentPhrase[i].title + ' ';
          i++;
        }
        //Send phrase as a string to otsimo.tts with spaces between words.
        this.tts.speak(currentPhraseString);
        this.events.appPhrase(currentPhraseString);
      }
    }
    /**
     * TouchStart function for backspace button.
     * Check backspace hold action in 500 m-secs.
     */
  bsTouchStart() {
    let bsElem = document.getElementById('bs');
    if (bsElem) {
      bsElem.style.color = otsimo.kv.removeHoldColor;
    }
    this.bstouchTimer = this.$timeout(() => {
      this.$scope.global.currentPhrase.splice(0, this.$scope.global.currentPhrase.length);
    }, 500);
  }

  /**
   * TouchEnd function for backspace button.
   * Clear the timeout for removing all words from current phrase.
   */
  bsTouchEnd() {
    let bsElem = document.getElementById('bs');
    if (bsElem) {
      bsElem.style.color = otsimo.kv.removeNormalColor;
    }
    this.$timeout.cancel(this.bstouchTimer);
  }
}

// Service Dependency Injection
PhraseController.$inject = ['$scope', '$global', '$timeout', 'EventManager', 'TTSManager', 'LSManager'];
