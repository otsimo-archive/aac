/* eslint-env jasmine */
import { module, inject } from 'mocks';
import KeyboardController from './keyboard-controller';
import keyboard from './keyboard';
import * as CONSTANT from '../../js/constants';
import Global from '../../services/global';
import EventManager from '../../services/event';
import TTSManager from '../../services/tts';
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

Array.prototype.contains = function (obj) {
  return this.indexOf(obj) > -1;
};

String.prototype.contains = function (it) {
  return this.indexOf(it) != -1;
};


describe('aacApp.keyboard module', () => {
  beforeEach(module(keyboard.name));
  let $controller, $timeout;
  let keyboardCtrl;
  let g, event, tts, ls;
  beforeEach(inject((_$controller_, _$timeout_) => {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $timeout = _$timeout_;
  }));

  beforeEach(() => {
    g = new Global();
    event = {
      appPhrase: function () {},
      appWord: function () {}
    };
    tts = {
      speak: function () {}
    };
    ls = new LSManager();
    g.changeTab = function () {}
      //$controller(dependentController, {$scope:{},$global:g});
  });

  describe('keyboard controller', () => {
    it('should be defined', () => {
      keyboardCtrl = $controller(KeyboardController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts });
      expect(keyboardCtrl)
        .toBeDefined();
    });
  });

  describe('enterSubmit', () => {
    it('should start fast type timeout when keycode is not 13 (enter)', () => {
      keyboardCtrl = $controller(KeyboardController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts });
      let ev = {};
      ev.keyCode = 65;
      let inp = document.createElement("input");
      document.body.innerHTML = document.body.innerHTML + '<input id="typeInput" value="ya"/>';
      keyboardCtrl.enterSubmit(ev);
      // Flush the fast type timeout.
      keyboardCtrl.$timeout.flush();
      expect(keyboardCtrl.suggestions).toBe(true);
    });
    it('should make suggestionList empty when input is empty', () => {
      keyboardCtrl = $controller(KeyboardController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts });
      let ev = {};
      ev.keyCode = 8; // backspace
      let inp = document.createElement("input");
      document.body.innerHTML = document.body.innerHTML + '<input id="typeInput" value=""/>';
      // input is empty
      keyboardCtrl.enterSubmit(ev);
      // Flush the fast type timeout.
      keyboardCtrl.$timeout.flush();
      expect(keyboardCtrl.suggestionList.length).toBe(0);
    });
    it('should submit the current input when keycode is 13 (enter)', () => {
      keyboardCtrl = $controller(KeyboardController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts });
      let ev = {};
      ev.keyCode = 13; // enter
      let inp = document.createElement("input");
      document.body.innerHTML = document.body.innerHTML + '<input id="typeInput" value="asd"/>';
      keyboardCtrl.enterSubmit(ev);
      expect(document.getElementById('typeInput').value.length).toBe(0);
    });
  });


  describe('suggestWordsByInput', () => {
    it('should set suggestionList by filtering given substring in mainSlugArray', () => {
      keyboardCtrl = $controller(KeyboardController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts });
      keyboardCtrl.$scope.global.mainSlugArray = ['dummy1', 'dummy2', "abdummy3"];
      keyboardCtrl.suggestWordsByInput("ab");
      expect(keyboardCtrl.suggestionList.length).toBe(1);
      expect(keyboardCtrl.suggestionList[0]).toBe("abdummy3")
      keyboardCtrl.suggestWordsByInput("dummy");
      expect(keyboardCtrl.suggestionList.length).toBe(2);
    });
    it('should set suggestionList by sorting words from short to long', () => {
      keyboardCtrl = $controller(KeyboardController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts });
      keyboardCtrl.$scope.global.mainSlugArray = ['dummy333', 'dummy4444', "dummy1", "dummy22", "dummy55555"];
      keyboardCtrl.suggestWordsByInput("dummy");
      expect(keyboardCtrl.suggestionList.length).toBe(5);
      expect(keyboardCtrl.suggestionList[0]).toBe("dummy1");
      expect(keyboardCtrl.suggestionList[keyboardCtrl.suggestionList.length - 1]).toBe("dummy55555");
    });
  });

  describe('checkWordInDB', () => {
    it('should check if a word is in the db (mainSlugArray)', () => {
      keyboardCtrl = $controller(KeyboardController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts });
      keyboardCtrl.$scope.global.mainSlugArray = ['dummy1', 'dummy2', "abdummy3"];
      expect(keyboardCtrl.checkWordInDB("dummy1")).toBe(true);
      expect(keyboardCtrl.checkWordInDB("adasdasdasd")).toBe(false);
    });
  });
});
