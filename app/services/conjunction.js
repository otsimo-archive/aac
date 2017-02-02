/**
 * ConjunctionManager handles all events
 * @export
 * @class ConjunctionManager
 */

export default class ConjunctionManager {
    constructor() {
        const symbolPackPath = otsimo.kv.symbolPack;
        const so = symbolPackPath.replace('symbols/', '');
        const pluginModule = require(`./../symbols/${so}/main.js`);
        this.pm = new pluginModule.default();
        this.name = this.pm.name;
        this.conjtype = this.pm.conjtype;
        this.poss = this.pm.poss;
        this.nounCondition = this.pm.nounCondition;
    }
    conjVerb(verb, tence, poss) {
        return this.pm.conjVerb(verb, tence, poss);
    }
    conjNoun(noun, type) {
        return this.pm.conjNoun(noun, type);
    }
    addPoss(verb, poss, tence) {
        return this.pm.addPoss(verb, poss, tence);
    }
}
