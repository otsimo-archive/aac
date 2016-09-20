/* eslint-env jasmine */
import { module, inject } from 'mocks';
import { GridController } from './grid-controller';
import { HeaderController } from '../header/header-controller';
import grid from './grid'
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
  if (normal) { classes.push('normal'); }
  if (derivable) { classes.push('derivable'); }
  if (group) { classes.push('group'); }
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


describe('aacApp.grid module', () => {
  beforeEach(module(grid.name));
  let $controller, $timeout, $httpBackend;
  let gridCtrl;
  let g, tts, ls;
  let gridSizeTestArray = [[2, 2], [3, 2], [3, 3], [4, 3], [5, 3], [5, 4], [6, 4], [6, 5], [8, 5], [10, 7], [11, 8]];

  beforeEach(inject((_$controller_, _$timeout_, _$httpBackend_) => {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $timeout = _$timeout_;
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(() => {
    localStorage.phraseHistory = '[]';
    tts = { speak: function () {} };
    event = {
      appDerive: function () {},
      appWord: function () {}
    };
    ls = new LSManager();
    g = new Global();
    g.changeCurrentTab = function () {}
  });

  describe('grid controller', () => {
    it('should be defined', () => {
      g.currentPhrase = generateSymbol(2, 1, 1, 0);
      g.mainArray = generateSymbol(10, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      // symbolCtrl = $controller(SymbolController, {$scope:{}, $global: g, TTSManager: tts, EventManager: event});
      expect(gridCtrl)
        .toBeDefined();
    });
  });

  describe('goNextMain', () => {
    it('should increase the pageNo scope variable', () => {
      g.mainArray = generateSymbol(200, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      gridCtrl.changeTab(CONSTANT.TAB_MAIN);
      // Open main tab first.
      let pageNoBefore = gridCtrl.$scope.pageNo;
      expect(gridCtrl.$scope.pageNo)
        .toMatch(/\d{1,}/);
      gridCtrl.goNextMain();
      expect(gridCtrl.$scope.pageNo)
        .toBe(pageNoBefore + 1);
    });
  });

  describe('goPrevMain', () => {
    it('should decrease the pageNo scope variable', () => {
      g.mainArray = generateSymbol(200, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      gridCtrl.changeTab(CONSTANT.TAB_MAIN);
      // Open main tab first.
      let pageNoBefore = gridCtrl.$scope.pageNo;
      expect(gridCtrl.$scope.pageNo)
        .toMatch(/\d{1,}/);
      gridCtrl.goPrevMain();
      if (pageNoBefore === 0) {
        expect(gridCtrl.$scope.pageNo)
          .toBe(0);
      } else {
        expect(gridCtrl.$scope.pageNo)
          .toBe(pageNoBefore - 1);
      }
    });
  });

  describe('mainArray', () => {
    it('should be defined and have at least 1 child.', () => {
      g.mainArray = generateSymbol(30, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      let mainArray = gridCtrl.$scope.global.mainArray;
      expect(mainArray)
        .toBeDefined();
      expect(mainArray.length)
        .toBeGreaterThan(0);
    });

    it('should have childs in word object format.', () => {
      g.mainArray = generateSymbol(30, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      let mainArray = gridCtrl.$scope.global.mainArray;
      mainArray.forEach((w) => {
        expect(typeof w.title)
          .toBe('string');
      });
    });

    it('should not contain any empty derivable word.', () => {
      g.mainArray = generateSymbol(30, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      let mainArray = gridCtrl.$scope.global.mainArray;
      mainArray.forEach((w) => {
        if (w.class == CONSTANT.CLASS_DERIVABLE) {
          expect(mainArray.filter((s) => s.parent == w.title)
              .length)
            .toBeGreaterThan(-1);
        }
      });
    });

    it('should not contain any empty groups.', () => {
      g.mainArray = generateSymbol(30, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      let mainArray = gridCtrl.$scope.global.mainArray;
      mainArray.forEach((w) => {
        if (w.class == CONSTANT.CLASS_GROUP) {
          expect(mainArray.filter((s) => s.parent == w.title)
              .length)
            .toBeGreaterThan(-1);
        }
      });
    });
  });

  describe('changeGridSize', () => {
    it('should set a new grid size for the app', () => {
      g.currentPhrase = generateSymbol(2, 1, 1, 0);
      g.mainArray = generateSymbol(300, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      //Set a grid size;
      let gr = gridSizeTestArray;
      gr.forEach(size => {
        gridCtrl.changeGridSize(size[0], size[1]);
        expect(gridCtrl.$scope.global.gridSize[0])
          .toEqual(size[0]);
        expect(gridCtrl.$scope.global.gridSize[1])
          .toEqual(size[1]);
      });

    });
  });

  describe('updateGridQuantity', () => {
    it('should update the gridQuantity relative to grid size (x*y) for main and pageNo = 0', () => {
      g.currentPhrase = generateSymbol(2, 1, 1, 0);
      g.mainArray = generateSymbol(300, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      //Set a grid size;
      let gr = gridSizeTestArray;
      gr.forEach(size => {
        gridCtrl.$scope.global.currentTab = CONSTANT.TAB_MAIN;
        gridCtrl.$scope.pageNo = 0;
        gridCtrl.changeGridSize(size[0], size[1]);
        gridCtrl.updateGridQuantity();
        // Quantity Updated
        expect(gridCtrl.$scope.global.gridQuantity)
          .toBe(size[0] * size[1]);
      });
    });


    it('should update the gridQuantity relative to grid size (x*y - 1) for main and pageNo != 0', () => {
      g.mainArray = generateSymbol(300, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      //Set a grid size;
      let gr = gridSizeTestArray;
      gr.forEach(size => {
        gridCtrl.$scope.global.currentTab = CONSTANT.TAB_MAIN;
        let pageN = [1, 2, 3, 4];
        pageN.forEach(p => {
          gridCtrl.$scope.pageNo = p;
          gridCtrl.changeGridSize(size[0], size[1]);
          gridCtrl.updateGridQuantity();
          // Quantity Updated
          expect(gridCtrl.$scope.global.gridQuantity)
            .toBe(size[0] * size[1] - 1);
        });
      });
    });

    it('should update the gridQuantity relative to grid size (x*y - 1) for derivable and group when pageNo = 0', () => {
      g.mainArray = generateSymbol(300, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      //Set a grid size;
      let gr = gridSizeTestArray;
      gr.forEach(size => {
        let tab = [CONSTANT.TAB_DERIVABLE, CONSTANT.TAB_GROUP];
        tab.forEach(t => {

          gridCtrl.$scope.global.currentTab = t;
          gridCtrl.$scope.pageNo = 0;
          gridCtrl.changeGridSize(size[0], size[1]);
          gridCtrl.updateGridQuantity();
          // Quantity Updated
          expect(gridCtrl.$scope.global.gridQuantity)
            .toBe(size[0] * size[1] - 1);
        });
      });
    });

    it('should update the gridQuantity relative to grid size (x*y - 1) for main, derivable and group when pageNo != 0', () => {
      g.mainArray = generateSymbol(300, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      //Set a grid size;
      let gr = gridSizeTestArray;
      gr.forEach(size => {
        let tab = [CONSTANT.TAB_MAIN, CONSTANT.TAB_DERIVABLE, CONSTANT.TAB_GROUP];
        tab.forEach(t => {
          gridCtrl.$scope.global.currentTab = t;

          let pageN = [1, 2, 3, 4];
          pageN.forEach(p => {
            gridCtrl.$scope.pageNo = p;
            gridCtrl.changeGridSize(size[0], size[1]);
            gridCtrl.updateGridQuantity();
            // Quantity Updated
            expect(gridCtrl.$scope.global.gridQuantity)
              .toBe(size[0] * size[1] - 1);
          });
        });
      });
    });
  });

  describe('sliceArray', () => {
    it('should slice the array by given slicing amount', () => {
      g.mainArray = generateSymbol(300, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      let gr = gridSizeTestArray;
      gridCtrl.changeTab(CONSTANT.TAB_MAIN);
      gr.forEach(size => {
        gridCtrl.sliceArray(size[0] * size[1]);
        let set1 = gridCtrl.$scope.mainDataUnpaged.length;
        let set2 = gridCtrl.$scope.mainData.length;
        expect(set1 + 1)
          .toBeGreaterThan(set2);
      });

    });

    it('should slice more than 1 page when sliced array has less child', () => {
      g.mainArray = generateSymbol(400, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      let gr = gridSizeTestArray;
      gridCtrl.changeTab(CONSTANT.TAB_MAIN);
      gr.forEach(size => {
        gridCtrl.sliceArray(size[0] * size[1]);
        let set1 = gridCtrl.$scope.mainDataUnpaged.length;
        let set2 = gridCtrl.$scope.mainData.length;
        if (set1 > set2) {
          let pNArray = [1, 2, 3, 4];
          pNArray.forEach(p => {
            gridCtrl.$scope.pageNo = p;
            gridCtrl.sliceArray(size[0] * size[1]);
            let set1_1 = gridCtrl.$scope.mainDataUnpaged.length;
            let set2_2 = gridCtrl.$scope.mainData.length;
            expect(set1_1 + 1)
              .toBeGreaterThan(set2_2);
          });
        }
      });

    });
  });

  describe('go2FirstPage', () => {
    it('should change the pageNo to 0', () => {

      g.mainArray = generateSymbol(30, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      let tab = [CONSTANT.TAB_MAIN, CONSTANT.TAB_DERIVABLE, CONSTANT.TAB_GROUP];
      tab.forEach(t => {
        gridCtrl.changeTab(t);
        gridCtrl.go2FirstPage();
        expect(gridCtrl.$scope.pageNo)
          .toBe(0);
      });
    });
  });

  describe('returnMaxPage', () => {
    it('should be 0 or greater than 0', () => {

      g.mainArray = generateSymbol(30, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      let gr = gridSizeTestArray;
      gr.forEach(size => {
        gridCtrl.changeGridSize(size[0], size[1]);
        gridCtrl.updateGridQuantity();
        let tab = [CONSTANT.TAB_MAIN, CONSTANT.TAB_DERIVABLE, CONSTANT.TAB_GROUP];
        tab.forEach(t => {
          gridCtrl.changeTab(t);
          expect(gridCtrl.returnMaxPage())
            .toBeGreaterThan(-1);
        });
      });
    });
  });

  describe('prevGroupStack', () => {
    it('should stack when user swaps between tabs', () => {
      g.mainArray = generateSymbol(300, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      gridCtrl.$scope.global.currentGroup = 'grouptest';
      gridCtrl.changeTab(CONSTANT.TAB_GROUP);
      expect(gridCtrl.prevGroupStack[0])
        .toBe('grouptest');

      gridCtrl.$scope.global.currentGroup = 'grouptest2';
      gridCtrl.changeTab(CONSTANT.TAB_GROUP);
      expect(gridCtrl.prevGroupStack[0])
        .toBe('grouptest');
      expect(gridCtrl.prevGroupStack[1])
        .toBe('grouptest2');
    });
  });

  describe('prevDerivableStack', () => {
    it('should stack when user swaps between tabs', () => {
      g.mainArray = generateSymbol(300, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      gridCtrl.$scope.global.currentDerivable = 'derivabletest';
      gridCtrl.changeTab(CONSTANT.TAB_DERIVABLE);
      expect(gridCtrl.prevDerivableStack[0])
        .toBe('derivabletest');

      gridCtrl.$scope.global.currentDerivable = 'derivabletest2';
      gridCtrl.changeTab(CONSTANT.TAB_DERIVABLE);
      expect(gridCtrl.prevDerivableStack[0])
        .toBe('derivabletest');
      expect(gridCtrl.prevDerivableStack[1])
        .toBe('derivabletest2');
    });
  });

  describe('goBack', () => {
    it('should pop the last child of the respective stack array', () => {
      g.currentPhrase = generateSymbol(2, 1, 1, 0);
      g.mainArray = generateSymbol(300, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      gridCtrl.$scope.global.currentTab = CONSTANT.TAB_GROUP;
      gridCtrl.$scope.global.currentGroup = 'grouptest';
      gridCtrl.changeTab(CONSTANT.TAB_GROUP);
      gridCtrl.$scope.global.currentGroup = 'grouptest2';
      gridCtrl.changeTab(CONSTANT.TAB_GROUP);
      gridCtrl.goBack();
      expect(gridCtrl.prevGroupStack.length)
        .toBe(1);


      gridCtrl.$scope.global.currentTab = CONSTANT.TAB_DERIVABLE;
      gridCtrl.$scope.global.currentDerivable = 'derivabletest';
      gridCtrl.changeTab(CONSTANT.TAB_DERIVABLE);
      gridCtrl.$scope.global.currentDerivable = 'derivabletest1';
      gridCtrl.changeTab(CONSTANT.TAB_DERIVABLE);
      gridCtrl.goBack();
      expect(gridCtrl.prevDerivableStack.length)
        .toBe(1);

    });
  });


  describe('pageNo', () => {
    it('should be equal to the previous pages pageNo when goBack action occured for every gridSize', () => {
      g.mainArray = generateSymbol(300, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      let gr = gridSizeTestArray;
      gr.forEach(size => {
        gridCtrl.changeGridSize(size[0], size[1]);
        gridCtrl.updateGridQuantity();
        gridCtrl.changeTab(CONSTANT.TAB_MAIN);
        let pages = [1, 3, 8];
        pages.forEach(p => {

          gridCtrl.$scope.pageNo = p;
          gridCtrl.$scope.global.currentDerivable = 'derivabletest';
          gridCtrl.changeTab(CONSTANT.TAB_DERIVABLE);
          expect(gridCtrl.$scope.pageNo)
            .toBe(0);
          gridCtrl.goBack();
          expect(gridCtrl.$scope.pageNo)
            .toBe(p);

          gridCtrl.$scope.pageNo = p;
          gridCtrl.$scope.global.currentGroup = 'grouptest';
          gridCtrl.changeTab(CONSTANT.TAB_GROUP);
          expect(gridCtrl.$scope.pageNo)
            .toBe(0);
          gridCtrl.goBack();
          expect(gridCtrl.$scope.pageNo)
            .toBe(p);

        });
      });

    });

    it('should be equal to the previous pages pageNo when goBack action occured 2 times for every gridSize', () => {
      let gr = gridSizeTestArray;
      g.mainArray = generateSymbol(300, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      gr.forEach(size => {
        gridCtrl.changeGridSize(size[0], size[1]);
        gridCtrl.updateGridQuantity();
        gridCtrl.changeTab(CONSTANT.TAB_MAIN);
        let pages = [1, 3, 8];
        pages.forEach(p => {

          gridCtrl.$scope.pageNo = p;
          gridCtrl.$scope.global.currentDerivable = 'derivabletest';
          gridCtrl.changeTab(CONSTANT.TAB_DERIVABLE);
          expect(gridCtrl.$scope.pageNo)
            .toBe(0);
          gridCtrl.$scope.pageNo = p + 1;
          gridCtrl.$scope.global.currentDerivable = 'derivabletest2';
          gridCtrl.changeTab(CONSTANT.TAB_DERIVABLE);
          expect(gridCtrl.$scope.pageNo)
            .toBe(0);
          gridCtrl.goBack();
          expect(gridCtrl.$scope.pageNo)
            .toBe(p + 1);
          gridCtrl.goBack();
          expect(gridCtrl.$scope.pageNo)
            .toBe(p + 1);

          gridCtrl.$scope.pageNo = p;
          gridCtrl.$scope.global.currentGroup = 'grouptest';
          gridCtrl.changeTab(CONSTANT.TAB_GROUP);
          expect(gridCtrl.$scope.pageNo)
            .toBe(0);
          gridCtrl.$scope.pageNo = p + 1;
          gridCtrl.$scope.global.currentGroup = 'grouptest2';
          gridCtrl.changeTab(CONSTANT.TAB_DERIVABLE);
          expect(gridCtrl.$scope.pageNo)
            .toBe(0);
          gridCtrl.goBack();
          expect(gridCtrl.$scope.pageNo)
            .toBe(p + 1);
          gridCtrl.goBack();
          expect(gridCtrl.$scope.pageNo)
            .toBe(p + 1);

        });
      });
    });
  });


  describe('pushNavigationHistory', () => {
    it('should push the currentTab if the last navigation item is not the current for the stated tab', () => {
      g.mainArray = generateSymbol(300, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      let possibleTabs = [CONSTANT.TAB_DERIVABLE, CONSTANT.TAB_GROUP];
      possibleTabs.forEach(t => {
        gridCtrl.$scope.global.currentDerivable = 'derivable1';
        gridCtrl.$scope.global.currentGroup = 'group1';
        gridCtrl.pushNavigationHistory(t);
      });
      expect(gridCtrl.prevDerivableStack[gridCtrl.prevDerivableStack.length - 1])
        .toBe('derivable1');
      expect(gridCtrl.prevGroupStack[gridCtrl.prevGroupStack.length - 1])
        .toBe('group1');
    });

    it('should not push the currentTab if the last navigation item is the current for the stated tab', () => {
      g.mainArray = generateSymbol(300, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      let possibleTabs = [CONSTANT.TAB_DERIVABLE, CONSTANT.TAB_GROUP];
      possibleTabs.forEach(t => {
        gridCtrl.$scope.global.currentDerivable = 'derivable1';
        gridCtrl.$scope.global.currentGroup = 'group1';
        gridCtrl.pushNavigationHistory(t);
        gridCtrl.$scope.global.currentDerivable = 'derivable1';
        gridCtrl.$scope.global.currentGroup = 'group1';
        gridCtrl.pushNavigationHistory(t);
      });
      expect(gridCtrl.prevDerivableStack.length)
        .toBe(1);
      expect(gridCtrl.prevGroupStack.length)
        .toBe(1);
    });
  });

  describe('changeTab', () => {
    it('should filterthe current mainArray, respect to given tabs current variable', () => {
      g.mainArray = generateSymbol(300, 1, 1, 1);
      gridCtrl = $controller(GridController, { $scope: {}, $global: g, $timeout: $timeout, TTSManager: tts, EventManager: event, LSManager: ls });
      let possibleTabs = [CONSTANT.TAB_DERIVABLE, CONSTANT.TAB_GROUP];
      possibleTabs.forEach(t => {
        let arrParents = [];
        gridCtrl.$scope.global.mainArray
          .filter(a => a.class == t)
          .forEach(p => {
            arrParents.push(p.slug);
          });
        arrParents.forEach(parent => {
          let filteredArr;
          if (t == CONSTANT.TAB_DERIVABLE) {
            gridCtrl.$scope.global.currentDerivable = parent;
          } else if (t == CONSTANT.TAB_GROUP) {
            gridCtrl.$scope.global.currentGroup = parent;
          }
          filteredArr = gridCtrl.$scope.global.mainArray.filter(fa => fa.parent == parent);
          gridCtrl.changeTab(t);
          expect(gridCtrl.$scope.mainDataUnpaged.length)
            .toBeGreaterThan(-1);
          expect(JSON.stringify(gridCtrl.$scope.mainDataUnpaged))
            .toBe(JSON.stringify(filteredArr));
        });
      });
    });
  });

});
