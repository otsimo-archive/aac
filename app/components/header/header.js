import angular from 'angular';
import HeaderController from './header-controller';

let headerModule = angular.module('aacApp.header', []);

headerModule.directive('header', function () {
  return {
    templateUrl: 'components/header/header.html'
  };
});

headerModule.controller('header-controller', HeaderController);

export default headerModule;
