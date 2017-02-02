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
import ConjunctionManager from 'services/conjunction'
import OtsimoHandler from 'services/otsimo-handler';

let aacApp = angular.module('aacApp', [headerModule.name, phraseModule.name, gridModule.name, 'ngTouch', 'as.sortable']);

aacApp.factory('$global', () => new Global());
aacApp.factory('EventManager', () => new EventManager());
aacApp.factory('TTSManager', () => new TTSManager());
aacApp.factory('LSManager', () => new LSManager());
aacApp.factory('ConjunctionManager', () => new ConjunctionManager());
aacApp.factory('OtsimoHandler', () => new OtsimoHandler());
aacApp.controller('aac-controller', AppController);

// Unhandled Rejection -> false
// Check this on other releases ^1.6.0
aacApp.config([
    '$qProvider',
    function($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }
]);
// Bootstrap the angular when document is ready.

otsimo.run(() => {
    angular.element(document).ready(() => {
        angular.bootstrap(document.body, [aacApp.name]);
    });
});
