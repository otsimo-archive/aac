/* eslint-env jasmine */
import { module, inject } from 'mocks';
import { SymbolController } from './symbol-controller';
import { GridController } from '../grid/grid-controller';
import { HeaderController } from '../header/header-controller';
import * as CONSTANT from '../../js/constants';
import symbolModule from './symbol';
import Global from '../../services/global';

describe('aacApp.symbol module', () => {
beforeEach(module(symbolModule.name));

let $controller, $timeout;
let symbolCtrl;
let g, tts;
beforeEach(inject((_$controller_, _$timeout_) => {
  // The injector unwraps the underscores (_) from around the parameter names when matching
  $controller = _$controller_;
  $timeout = _$timeout_;
}));

beforeEach(() => {
  g = new Global();
  g.changeTab = function () {}
  g.currentPhrase = [
    {
      title: 'firstSymbol',
      slug: 'firstSymbol'
      },
    {
      title: 'secondSymbol',
      slug: 'secondSymbol'
      }
    ];
  tts = { speak: function () {} };
  event = {
    appDerive: function () {},
    appWord: function () {}
  };
  symbolCtrl = $controller(SymbolController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event });
  $controller(HeaderController, { $scope: {}, $global: g });
});

describe('symbol controller', () => {
  it('should be defined', () => {
    expect(symbolCtrl)
      .toBeDefined();
  });
});

describe('clickAnimStart', () => {
  it('should change the clickAnimIndex', () => {
    symbolCtrl.clickAnimStart(5);
    expect(symbolCtrl.$scope.currentAnimIndex)
      .toBe(5);
  });
});

describe('clickWord', () => {
  it('should add the given symbol object to currentPhrase', () => {
    let word2add = {
      title: 'newWord',
      slug: 'newWord'
    };
    symbolCtrl.clickWord(word2add);
    let cp = symbolCtrl.$scope.global.currentPhrase;
    expect(JSON.stringify(cp[cp.length - 1]))
      .toBe(JSON.stringify(word2add));
  });
});

describe('wordTouchStart', () => {
  let dummyWord1 = {
    title: 'dummyWord1',
    slug: 'dummyWord1',
    type: 'naun',
    class: 'derive',
    parent: 'main',
    style: 'gridType-noun'
  };
  let dummyWord2 = {
    title: 'dummyWord2',
    slug: 'dummyWord2',
    type: 'naun',
    class: 'group',
    parent: 'main',
    style: 'gridType-group'
  };
  it('should start the when timeout flushed get in derivable page if given symbol is derivable', () => {
    symbolCtrl.wordTouchStart(dummyWord1, 0);
    $timeout.flush();
    expect(symbolCtrl.$scope.global.currentTab)
      .toBe(CONSTANT.TAB_MAIN);
    expect(symbolCtrl.$scope.currentAnimIndex)
      .toBe(0);

    symbolCtrl.wordTouchStart(dummyWord2, 3);
    $timeout.flush();
    expect(symbolCtrl.$scope.global.currentTab)
      .toBe(CONSTANT.TAB_MAIN);
    expect(symbolCtrl.$scope.currentAnimIndex)
      .toBe(3);

  });

  it('should change currentDerivable to its title if given symbol is derivable', () => {
    symbolCtrl.wordTouchStart(dummyWord1, 8);
    $timeout.flush();
    expect(symbolCtrl.$scope.global.currentDerivable)
      .toBe('dummyWord1');
    expect(symbolCtrl.$scope.currentAnimIndex)
      .toBe(8);
  });

  it('should change currentGroup to its title if given symbol is group', () => {
    symbolCtrl.wordTouchStart(dummyWord2, 4);
    $timeout.flush();
    expect(symbolCtrl.$scope.global.currentGroup)
      .toBe('dummyWord2');
    expect(symbolCtrl.$scope.currentAnimIndex)
      .toBe(4);
  });
});

});
ummyWord1, 8);
$timeout.flush();
expect(symbolCtrl.$scope.global.currentDerivable)
  .toBe('dummyWord1');
expect(symbolCtrl.$scope.currentAnimIndex)
  .toBe(8);
});

it('should change currentGroup to its title if given symbol is group', () => {
symbolCtrl.wordTouchStart(dummyWord2, 4);
$timeout.flush();
expect(symbolCtrl.$scope.global.currentGroup)
.toBe('dummyWord2');
expect(symbolCtrl.$scope.currentAnimIndex)
.toBe(4);
});
});

});
