import angular from 'angular';
import KeyboardController from './keyboard-controller'

let keyboardModule = angular.module('aacApp.keyboard', []);

keyboardModule.directive('keyboard', function () {
  return {
    templateUrl: 'components/keyboard/keyboard.html'
  };
});

keyboardModule.controller('keyboard-controller', KeyboardController);

export default keyboardModule;
