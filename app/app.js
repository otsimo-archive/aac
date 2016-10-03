import angular from 'angular'
import ngsortable from 'ng-sortable'

import headerModule from 'components/header/header'
import phraseModule from 'components/phrase/phrase'
import gridModule from 'components/grid/grid'

import AppController from './app-controller'
import Global from 'services/global'
import EventManager from 'services/event'
import TTSManager from 'services/tts'
import LSManager from 'services/localstorage'

let aacApp = angular
  .module('aacApp', [
    headerModule.name,
    phraseModule.name,
    gridModule.name,
    'ngTouch',
    'as.sortable'
  ]);
aacApp.factory('$global', () => new Global());
aacApp.factory('EventManager', () => new EventManager());
aacApp.factory('TTSManager', () => new TTSManager());
aacApp.factory('LSManager', () => new LSManager());
aacApp.controller('aac-controller', AppController);

// Bootstrap the angular when document is ready.
angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document.body, [aacApp.name])
  });



document.ontouchmove = function (event) {
  event.preventDefault();
}

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

if (!localStorage.phraseHistory) {
  console.log('LS: not yet initilized, firstTime load.');
  localStorage.phraseHistory = '[]';
}

Array.prototype.contains = function (obj) {
  return this.indexOf(obj) > -1;
};

String.prototype.contains = function (it) {
  return this.indexOf(it) != -1;
};
