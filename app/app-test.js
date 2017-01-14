/* eslint-env jasmine */
import { module, inject } from 'mocks';
import ngTouch from 'angular-touch';
import FastClick from 'fastclick';
import AppController from './app-controller';
import app from './app';
//import * as CONSTANT from './js/constants';
import Global from 'services/global';
import EventManager from 'services/event';
import TTSManager from 'services/tts';
import LSManager from 'services/localstorage';
//import MOCKED_CONSTANT from './js/constants';

Array.prototype.unique = function() {
	var u = {},
		a = [];
	for (var i = 0, l = this.length; i < l; ++i) {
		if (u.hasOwnProperty(this[i])) {
			continue;
		}
		a.push(this[i]);
		u[this[i]] = 1;
	}
	return a;
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
	if (normal) { classes.push("main"); }
	if (derivable) { classes.push("derivable"); }
	if (group) { classes.push("group"); }
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

Array.prototype.contains = function(obj) {
	return this.indexOf(obj) > -1;
};

String.prototype.contains = function(it) {
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
		g.pushToCurrentPhrase = function(obj) {
			keyboardCtrl.$scope.global.currentPhrase.push(obj);
		}
		g.extendedArray = [];
		g.mainArray = [];
		event = {
			appPhrase: function() {},
			appWord: function() {}
		};
		tts = {
			speak: function() {}
		};
		ls = new LSManager();
		g.changeTab = function() {}
			//$controller(dependentController, {$scope:{},$global:g});
		ots = {
			init: function() {
				return {
					run: function() {},
					onResolutionChanged: function() {},
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

	describe('map', () => {
		it('should be expected', () => {
			appCtrl = $controller(AppController, { $scope: {}, $global: g, $timeout: $timeout, EventManager: event, TTSManager: tts, OtsimoHandler: ots });
			appCtrl.otsimo.child.language = "tr";


			appCtrl.$scope.global.extendedArray = [];
			appCtrl.$scope.global.extendedTitleArray = [];
			appCtrl.$scope.global.extendedSlugArray = [];

			appCtrl.$scope.global.mainArray = [{
				title: "aasd",
				slug: "aasd",
				synonym: ["sdsdsd"]
			}, {
				title: "asd qwe",
				slug: "asd-qwe",
				synonym: ["qwe123"]
			}];
			appCtrl.initExtendedSymbols();
			expect(appCtrl.$scope.global.extendedArray).toBeDefined();
			expect(appCtrl.$scope.global.extendedTitleArray.length).toBe(4);
			expect(appCtrl.$scope.global.extendedSlugArray.length).toBe(4);

			appCtrl.$scope.global.extendedArray = [];
			appCtrl.$scope.global.extendedTitleArray = [];
			appCtrl.$scope.global.extendedSlugArray = [];

			appCtrl.$scope.global.mainArray = [{
				title: "aasd",
				slug: "aasd",
				synonym: ["sdsdsd"],
				type: "noun"
			}, {
				title: "asd qwe",
				slug: "asd-qwe",
				synonym: ["qwe123"],
				type: "noun"
			}];
			appCtrl.initExtendedSymbols();
			expect(appCtrl.$scope.global.extendedArray).toBeDefined();
			expect(appCtrl.$scope.global.extendedTitleArray.length).toBe(4);
			expect(appCtrl.$scope.global.extendedSlugArray.length).toBe(4);

			appCtrl.$scope.global.extendedArray = [];
			appCtrl.$scope.global.extendedTitleArray = [];
			appCtrl.$scope.global.extendedSlugArray = [];

			appCtrl.$scope.global.mainArray = [{
				title: "aasd",
				slug: "aasd",
				synonym: [],
				type: "verb"
			}, {
				title: "asd qwe",
				slug: "asd-qwe",
				synonym: [],
				type: "verb"
			}];
			appCtrl.initExtendedSymbols();
			expect(appCtrl.$scope.global.extendedArray.length).toBe(2);
			expect(appCtrl.$scope.global.extendedTitleArray.length).toBe(2);
			expect(appCtrl.$scope.global.extendedSlugArray.length).toBe(2);
		});
	});

});
