import angular from 'angular';
import SymbolController from './symbol-controller';

let symbolModule = angular.module('aacApp.symbol', []);

symbolModule.directive('symbol', function () {
  return {
    templateUrl: 'components/symbol/symbol.html'
  };
});

symbolModule.controller('symbol-controller', SymbolController);

export default symbolModule;
