/* eslint-env jasmine */
import { module, inject } from 'mocks'
import HeaderController from './header-controller'
import GridController from '../grid/grid-controller'
import header from './header'
import Global from '../../services/global'
import LSManager from '../../services/localstorage'

describe('aacApp.header module', () => {
	beforeEach(module(header.name));

	let $controller;
	let headerCtrl;
	let g, ls, tts, cm;
	beforeEach(inject((_$controller_) => {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	beforeEach(() => {
		g = new Global();
		g.changeTab = function() {}
		ls = new LSManager();
		g.pushToCurrentPhrase = function(obj) {
			headerCtrl.$scope.global.currentPhrase.push(obj);
		}
		tts = { speak: function() {} };
		cm = {
			englishConjunctor: function() {},
			turkishConjunctor: function() {},
			addPossessiveEn: function() {},
			addPossessiveTr: function() {}
		};
		headerCtrl = $controller(HeaderController, { $scope: {}, $global: g });
		$controller(GridController, { $scope: {}, $global: g, LSManager: ls, TTSManager: tts, ConjunctionManager: cm });
	});

	describe('header controller', () => {
		it('should be defined', () => {
			expect(headerCtrl)
				.toBeDefined();
		});
	});

	describe('currentTab', () => {
		it('should be equal to recent after calling openRecent function', () => {
			headerCtrl.openRecent();
			expect(headerCtrl.$scope.global.currentTab)
				.toBe('recent');
			expect(headerCtrl.$scope.global.isHome)
				.toBe(0);
		});

		it('should be equal to main after calling openGrid function', () => {
			headerCtrl.openGrid();
			expect(headerCtrl.$scope.global.currentTab)
				.toBe('main');
		});

		it('should be equal to main after calling goHome function', () => {
			headerCtrl.goHome();
			expect(headerCtrl.$scope.global.currentTab)
				.toBe('main');
			expect(headerCtrl.$scope.global.isHome)
				.toBe(1);
		});

	});

	describe('pageNo', () => {
		it('should be equal to 0 after calling goHome function', () => {
			headerCtrl.goHome();
			expect(headerCtrl.$scope.global.go2FirstPage())
				.toBe(0);
		});
	});

	describe('currentGroup', () => {
		it('should be empty string after calling goHome f', () => {
			headerCtrl.goHome();
			expect(headerCtrl.$scope.global.currentGroup)
				.toBe('');
		});
	});

	describe('currentDerivable', () => {
		it('should be empty string after calling goHome f', () => {
			headerCtrl.goHome();
			expect(headerCtrl.$scope.global.currentDerivable)
				.toBe('');
		});
	});

});
