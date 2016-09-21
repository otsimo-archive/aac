import angular from 'angular';
import RecentController from './recent-controller'

let recentModule = angular.module('aacApp.recent', []);

recentModule.directive('recent', function () {
  return {
    templateUrl: 'components/recent/recent.html'
  };
});

recentModule.controller('recent-controller', RecentController);

export default recentModule;
