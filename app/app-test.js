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
  let appCtrl;
  let g, event, tts, ls, ots;

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
    ots = {
      init: function () {
        return {
          run: function () {},
          onResolutionChanged: function () {},
          kv: {},
          child: {}
        }
      }
    };
  });

  describe('app controller', () => {
    it('should be defined', () => {
      appCtrl = $controller(AppController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts, OtsimoHandler: ots });
      expect(appCtrl).toBeDefined();
    });
  });

  describe('setUIText', () => {
    it('should set texts and variables from otsimo to scope', () => {
      appCtrl = $controller(AppController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts, OtsimoHandler: ots });
      appCtrl.otsimo.kv.pageText1 = "pagetextmock";
      appCtrl.setUIText();
      expect(appCtrl.$scope.pageText1).toBe("pagetextmock");
    });
  });

  describe('language', () => {
    it('should be set!', () => {
      appCtrl = $controller(AppController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts, OtsimoHandler: ots });
      appCtrl.otsimo.child.language = "tr";
      appCtrl.setSettings();
      expect(appCtrl.$scope.global.language).toBe("tr");
      appCtrl.otsimo.child.language = "en";
      appCtrl.setSettings();
      expect(appCtrl.$scope.global.language).toBe("en");
    });
  });

});
