import angular from 'angular';
import PhraseController from './phrase-controller'

let phraseModule = angular.module('aacApp.phrase', []);

phraseModule.directive('phrase', function () {
  return {
    templateUrl: 'components/phrase/phrase.html'
  };
});

phraseModule.controller('phrase-controller', PhraseController);

export default phraseModule;
