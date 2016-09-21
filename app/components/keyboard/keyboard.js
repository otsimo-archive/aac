import angular from 'angular';
import keyboardController from './keyboard-controller'

let keyboardModule = angular.module('aacApp.keyboard', []);

keyboardModule.directive('keyboard', function () {
  return {
    templateUrl: 'components/keyboard/keyboard.html'
  };
});

keyboardModule.controller('keyboard-controller', keyboardController);

export default keyboardModule;
