import angular from 'angular'

import recentModule from 'components/recent/recent'
import symbolModule from 'components/symbol/symbol'
import GridController from './grid-controller'

let gridModule = angular.module('aacApp.grid', [
  recentModule.name,
  symbolModule.name
]);

gridModule.directive('grid', function () {
  return {
    templateUrl: 'components/grid/grid.html'
  };
});
gridModule.controller('grid-controller', GridController);

export default gridModule;
