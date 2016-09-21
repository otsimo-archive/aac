/**
 * EventManager handles all events
 * @export
 * @class EventManager
 */
export default class EventManager {
  /**
   * Custom Event: Sends submitted current phrase as string with white spaces (word1 word2 word3 ...).
   * @param {string} currentPhrase
   */
  appPhrase(currentPhrase) {
      otsimo.customevent('app:phrase', { phrase: currentPhrase });
    }
    /**
     * Custom Event: Sends the time interval changes in the recent tab
     * @param {number} timeInterval
     */
  appInterval(timeInterval) {
      otsimo.customevent('app:time_interval', { recent_time_interval: timeInterval });
    }
    /**
     * Custom Event: Sends the derivable word when user holds on one.
     * @param {string} derived
     */
  appDerive(derived) {
      otsimo.customevent('app:derive', { derivative: derived });
    }
    /**
     * Custom Event: Sends a word that added to current pharase list
     * @param {string} word the word
     * @param {number} x grid height
     * @param {number} y grid width
     */
  appWord(word, x, y) {
    otsimo.customevent('app:word', { word: word, grid_x: x, grid_y: y, grid_xy: x + 'x' + y });
  }
}
