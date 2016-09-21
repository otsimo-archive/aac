import { returnTime } from '../js/utils'
/**
 * LSManager handles actions with localstorage utility
 The recent phrase history is stored in the localstorage utility of HTML5
 This service contains an interface for modules to interact with localstorage.
 * @export
 * @class LSManager
 */
export default class LSManager {

  /**
   * Returns the phrase history as an array
   * @returns {array} lastPhrases
   */
  getHistoryAsArray() {
    return JSON.parse(localStorage.phraseHistory);
  }

  /**
   * Updates the history object with given
   * @param {string} json string of the history
   */
  updateHistoryAsString(tempArr) {
    localStorage.phraseHistory = JSON.stringify(tempArr);
  }

  /**
   * Adds a phrase (array of word objects) to the history
   * @param {array} array of word objects
   */
  addPhrase2History(arrPhrase) {
    let tempHistoryArr = this.getHistoryAsArray();
    let stringifyLast;
    if (tempHistoryArr.length > 0) {
      stringifyLast = JSON.stringify(tempHistoryArr[tempHistoryArr.length - 1].phrase);
    }
    if (stringifyLast !== JSON.stringify(arrPhrase)) {
      let obj2Push = {};
      obj2Push.phrase = arrPhrase;
      obj2Push.time = returnTime();
      tempHistoryArr.push(obj2Push);
      this.updateHistoryAsString(tempHistoryArr);
    }
  }

}
