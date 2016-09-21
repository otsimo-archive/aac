import { returnTime } from 'js/utils';

/**
 * RecentController
 * @export
 * @class RecentController
 */
export class RecentController {
  /**
   * Creates an instance of RecentController.
   *
   * @param {any} $scope
   * @param {any} $global
   * @param {any} EventManager
   *
   * @memberOf RecentController
   */
  constructor($scope, $global, EventManager, LSManager) {
    this.$scope = $scope;
    this.$scope.global = $global;
    this.events = EventManager;
    this.ls = LSManager;

    // Initilize variables for controller.
    this.bstouchTimer;

    // Call controllerInit
    this.controllerInit();
  }

  /**
   * Create or facilitate new functions for $scope or $global service.
   */
  controllerInit() {
    this.$scope.global.recentPhrases = this.ls.getHistoryAsArray();
    // Open 'last 30 min' History interval then controller initilized.
    this.changeInterval(1);
  }

  /**
   * Loads a prior phrase from history to the current phrase.
   * If there is; Adds the old phrase to end of the current phrase.
   * @param {number} index - the index
   */
  loadRecentPhrase(index) {
    let phraseHistory = this.$scope.recentPhrasesList;
    let phrase2Add = phraseHistory[phraseHistory.length - (index + 1)].phrase;
    this.$scope.global.currentPhrase = this.$scope.global.currentPhrase.concat(phrase2Add);
  }

  /**
   * Changes the showing history interval to stated interval.
   * @param {number} val The value which can be 1,2,3,4
   */
  changeInterval(val) {
    // 1 -> last 30 min;
    // 2 -> Today
    // 3 -> Yesterday
    // 4 -> Last Week
    let timeH;
    let timeC = returnTime();
    let timeL;
    const halfHour = 1000 * 60 * 30;
    const oneDay = halfHour * 2 * 24;
    const oneWeek = oneDay * 7;
    if (val === 1) {
      timeH = timeC;
      timeL = timeC - halfHour;
    } else if (val === 2) {
      timeH = timeC - halfHour;
      timeL = timeC - oneDay;
    } else if (val === 3) {
      timeH = timeC - oneDay;
      timeL = timeC - oneDay * 2;
    } else if (val === 4) {
      timeH = timeC - oneDay * 2;
      timeL = timeC - oneWeek;
    }
    if (this.$scope.global.recentPhrases) {
      this.$scope.recentPhrasesList = this.$scope.global.recentPhrases
        .filter((phraseRecent) => phraseRecent.time < timeH && phraseRecent.time > timeL);
    }
    this.events.appInterval(val);
  }
}
