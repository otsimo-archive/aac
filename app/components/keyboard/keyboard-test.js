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
      appPhrase: function () {}
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
  });
});
