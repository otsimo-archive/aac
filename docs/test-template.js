/* eslint-env jasmine */
import { module, inject } from 'mocks'
import { phraseController } from './phrase-controller'
import { gridController } from '../grid/grid-controller'
import phrase from './phrase'
import global from '../../services/global'

describe('aacApp.phrase module', () => {
  beforeEach(module(phrase.name));

  let $controller;
  let phraseCtrl;
  let g;
  beforeEach(inject((_$controller_) => {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  beforeEach(() => {
    g = new global();
    g.changeTab = function () {}
    phraseCtrl = $controller(phraseController, { $scope: {}, $global: g });
    //$controller(dependentController, {$scope:{},$global:g});
  });

  describe('phrase controller', () => {
    it('should be defined', () => {
      expect(phraseCtrl)
        .toBeDefined();
    });
  });


});
