/* eslint-env jasmine */
import { module, inject } from 'mocks';
import { PhraseController } from './phrase-controller';
import { GridController } from '../grid/grid-controller';
import phrase from './phrase';
import * as CONSTANT from '../../js/constants';
import Global from '../../services/global';
import EventManager from '../../services/event';
import TTSManager from '../../services/tts';
import LSManager from '../../services/localstorage';

function setLocalStorageDataSet(set) {
  if (set === 'full') {
    localStorage.phraseHistory = JSON.stringify(generatePhraseHistory(10));
  } else if (set === 'empty') {
    localStorage.phraseHistory = '';
  }
}

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
  if (normal) { classes.push(CONSTANT.TAB_MAIN); }
  if (derivable) { classes.push(CONSTANT.TAB_DERIVABLE); }
  if (group) { classes.push(CONSTANT.TAB_GROUP); }
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
  beforeEach(module(phrase.name));
  let $controller, $timeout;
  let phraseCtrl;
  let g, event, tts, ls;
  beforeEach(inject((_$controller_, _$timeout_) => {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $timeout = _$timeout_;
  }));

  beforeEach(() => {
    setLocalStorageDataSet('full');
    g = new Global();
    event = {
      appPhrase: function () {}
    };
    tts = {
      speak: function () {}
    };
    ls = new LSManager();
    g.changeTab = function () {}
      //$controller(dependentController, {$scope:{},$global:g});
  });

  describe('phrase controller', () => {
    it('should be defined', () => {
      phraseCtrl = $controller(PhraseController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts, LSManager: ls });
      expect(phraseCtrl)
        .toBeDefined();
    });
  });

  describe('removeLastWord', () => {
    it('should remove the last symbol array from the currentPhrase', () => {
      g.currentPhrase = generateSymbol(2, 1, 1, 1);
      phraseCtrl = $controller(PhraseController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts, LSManager: ls });

      // Lenght will be 2 at the begining after calling removeLastWord it should be 1;
      expect(phraseCtrl.$scope.global.currentPhrase.length)
        .toBe(2);
      phraseCtrl.removeLastWord();
      expect(phraseCtrl.$scope.global.currentPhrase.length)
        .toBe(1);
      //Last item after removing should be lastItem after removeLastWord();
      let lastItem = g.currentPhrase[g.currentPhrase.length - 1];
      let cp = phraseCtrl.$scope.global.currentPhrase;
      expect(cp[cp.length - 1].title)
        .toBe(lastItem.title);
      expect(cp[cp.length - 1].slug)
        .toBe(lastItem.slug);

    });
  });

  describe('bsTouchStart', () => {
    it('should remove all symbol objects in the currentPhrase', () => {
      g.currentPhrase = generateSymbol(2, 1, 1, 1);
      phraseCtrl = $controller(PhraseController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts, LSManager: ls });
      phraseCtrl.bsTouchStart();
      // After calling bsTouchStart, currentPhrase should have 2 element
      expect(phraseCtrl.$scope.global.currentPhrase.length)
        .toBe(2);
      $timeout.flush();
      // After flushing the timeout, currentPhrase shouldnt have any element.
      expect(phraseCtrl.$scope.global.currentPhrase.length)
        .toBe(0);
    });
  });

  describe('bsTouchEnd', () => {
    it('should cancel the remove all timeout.', () => {
      g.currentPhrase = generateSymbol(2, 1, 1, 1);
      phraseCtrl = $controller(PhraseController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts, LSManager: ls });
      phraseCtrl.bsTouchStart();
      // timeout should start after bsTouchStart.
      expect(phraseCtrl.$scope.global.currentPhrase.length)
        .toBe(2);
      phraseCtrl.bsTouchEnd();
      // timeout should cancel and phrase lenght should be same.
      expect(phraseCtrl.$scope.global.currentPhrase.length)
        .toBe(2);
    });
  });

  describe('submitPhrase', () => {
    it('should submit the current phrase to localstorage history.', () => {
      g.currentPhrase = generateSymbol(2, 1, 1, 1);
      phraseCtrl = $controller(PhraseController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts, LSManager: ls });
      phraseCtrl.submitPhrase();
      let LShistory = JSON.parse(localStorage.phraseHistory);
      expect(LShistory[LShistory.length - 1].phrase.length)
        .toBe(2);
      let lastPhrase = LShistory[LShistory.length - 1].phrase;
      let currentPhrase = phraseCtrl.$scope.global.currentPhrase;
      expect(JSON.stringify(lastPhrase))
        .toBe(JSON.stringify(currentPhrase));
    });
    it('should submit the current phrase with time.', () => {
      phraseCtrl.submitPhrase();
      let LShistory = JSON.parse(localStorage.phraseHistory);
      expect(LShistory[LShistory.length - 1].time)
        .toBeGreaterThan(0);
    });
  });


});
