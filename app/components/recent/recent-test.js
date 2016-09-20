/* eslint-env jasmine */
import { module, inject } from 'mocks';
import { RecentController } from './recent-controller';
import recentModule from './recent';
import * as CONSTANT from '../../js/constants';
import Global from '../../services/global';
import LSManager from '../../services/localstorage';

function randomString(len, charSet) {
  charSet = charSet || 'abcdefghijklmnopqrstuvwxyz';
  let randomString = '';
  for (let i = 0; i < len; i++) {
    let randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

function generateSymbol(length, normal, derivable, group) {
  let classes = [];
  if (normal) { classes.push(CONSTANT.CLASS_MAIN); }
  if (derivable) { classes.push(CONSTANT.CLASS_DERIVABLE); }
  if (group) { classes.push(CONSTANT.CLASS_GROUP); }
  let i = 0;
  let symbArray = [];
  while (i < length) {
    let randString = randomString(7);
    let wordObj = {
      title: randString,
      slug: randString,
      type: 'noun',
      parent: 'main'
    };
    wordObj.class = classes[Math.floor(Math.random() * (classes.length - 1)) + 1];
    symbArray.push(wordObj);
    i++;
  }
  return symbArray;
}

function generatePhraseHistory(length) {
  let symbPhraseArray = [];
  let i = 0;
  while (i < length) {
    let randString = randomString(7);
    let phraseObj = {
      phrase: generateSymbol(3, 1, 1, 0),
      time: 1473336150685
    };
    symbPhraseArray.push(phraseObj);
    i++;
  }
  return symbPhraseArray;
}

describe('aacApp.phrase module', () => {
  beforeEach(module(recentModule.name));

  let $controller;
  let recentCtrl;
  let g, event, ls;
  beforeEach(inject((_$controller_) => {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  beforeEach(() => {
    g = new Global();
    ls = new LSManager();
    event = { appInterval: function () {} };
    g.changeTab = function () {}
      //$controller(dependentController, {$scope:{},$global:g});
  });

  describe('recent controller', () => {
    it('should be defined', () => {
      recentCtrl = $controller(RecentController, { $scope: {}, $global: g, EventManager: event, LSManager: ls });
      expect(recentCtrl)
        .toBeDefined();
    });
  });

  describe('loadRecentPhrase', () => {
    it('should pushes the the prior phrase with given index', () => {
      g.currentPhrase = generateSymbol(2, 1, 1, 0);
      g.recentPhrases = generatePhraseHistory(5);
      recentCtrl = $controller(RecentController, { $scope: {}, $global: g, EventManager: event, LSManager: ls });
      recentCtrl.$scope.recentPhrasesList = generatePhraseHistory(10);
      let index = 0;
      while (index < recentCtrl.$scope.recentPhrasesList.length) {
        recentCtrl.$scope.global.currentPhrase = generateSymbol(2, 1, 1, 1);
        recentCtrl.loadRecentPhrase(index);
        let cp = recentCtrl.$scope.global.currentPhrase;
        let addition2CurrentPhrase = cp.slice(2, cp.length);
        let rp = recentCtrl.$scope.recentPhrasesList;
        let loadedPhrase = rp[rp.length - (index + 1)].phrase;
        expect(JSON.stringify(addition2CurrentPhrase))
          .toBe(JSON.stringify(loadedPhrase));
        index++;
      }
    });
  });


  describe('recentPhrases', () => {
    it('should have at least 1 symbol element inside', () => {
      let i = 0;
      recentCtrl.$scope.global.currentPhrase = generateSymbol(2, 1, 1, 1);
      recentCtrl.$scope.global.recentPhrases.forEach(() => {
        expect(recentCtrl.$scope.global.recentPhrases[i].phrase.length)
          .toBeGreaterThan(0);
        i++;
      });
    });
  });

  describe('changeInterval', () => {
    it('should filter recentPhrases to the given time interval', () => {
      g.currentPhrase = generateSymbol(2, 1, 1, 0);
      g.recentPhrases = generatePhraseHistory(5);
      recentCtrl = $controller(RecentController, { $scope: {}, $global: g, EventManager: event, LSManager: ls });
      recentCtrl.$scope.recentPhrasesList = generatePhraseHistory(10);
      recentCtrl.changeInterval(1);
      expect(recentCtrl.$scope.recentPhrasesList.length)
        .toMatch(/\d{1,}/);
      recentCtrl.changeInterval(2);
      expect(recentCtrl.$scope.recentPhrasesList.length)
        .toMatch(/\d{1,}/);
      recentCtrl.changeInterval(3);
      expect(recentCtrl.$scope.recentPhrasesList.length)
        .toMatch(/\d{1,}/);
      recentCtrl.changeInterval(4);
      expect(recentCtrl.$scope.recentPhrasesList.length)
        .toMatch(/\d{1,}/);
    });
  });



});
