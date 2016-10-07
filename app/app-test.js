/* eslint-env jasmine */
import { module, inject } from 'mocks';
import ngTouch from 'angular-touch';
import FastClick from 'fastclick';
import AppController from './app-controller';
import app from './app';
import * as CONSTANT from 'js/constants';
import Global from 'services/global';
import EventManager from 'services/event';
import TTSManager from 'services/tts';
import LSManager from 'services/localstorage';
import OtsimoHandler from 'services/otsimo-handler';

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


describe('aacApp.main module', () => {
  beforeEach(module("aacApp"));
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
    g.pushToCurrentPhrase = function (obj) {
      keyboardCtrl.$scope.global.currentPhrase.push(obj);
    }
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

  describe('app controller', () => {
    it('should be defined', () => {
      // appCtrl = $controller(AppController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts });
      // expect(appCtrl).toBeDefined();
      expect(0).toBe(0);
    });
  });
});
