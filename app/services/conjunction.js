import { turkishConjunctor, addPossessiveTr } from '../js/fiil';
import { englishConjunctor, addPossessiveEn } from '../js/verb';
/**
 * ConjunctionManager handles all events
 * @export
 * @class ConjunctionManager
 */
export default class ConjunctionManager {
	/**
	 * Returns conjuncted verb with given tence in english
	 * @param {string} verb
	 * @param {string} tence
	 * @param {string} poss - Possessor
	 *
	 */
	conjEnglish(verb, tence, poss) {
		return englishConjunctor(verb, tence, poss);
	}

	/**
	 * Returns conjuncted verb with given tence in turkish
	 * @param {string} verb
	 * @param {string} tence
	 * @param {string} poss - Possessor
	 *
	 */
	conjTurkish(verb, tence, poss) {
			return turkishConjunctor(verb, tence, poss);
		}
		/**
		 * Return verb in the given possessor format
		 * @param {string} verb
		 * @param {string} poss - Possessor
		 * @param {string} tence - Tence
		 *
		 */
	addEnglishPoss(verb, poss, tence) {
			return addPossessiveEn(verb, poss, tence);
		}
		/**
		 * Return verb in the given possessor format
		 * @param {string} verb
		 * @param {string} poss - Possessor
		 * @param {string} tence - Tence
		 *
		 */
	addTurkishPoss(verb, poss, tence) {
		return addPossessiveTr(verb, poss, tence);
	}
}
