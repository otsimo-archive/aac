/*
  -- recent.js
  Directive and controller for phrase history in the app;

*/
/*
aacApp.directive('recent', function () {
    return {
        templateUrl: 'template/recent.html'
    };
});
*/

describe('Recent Phrase Controller', function() {
  beforeEach(module('otsPescGeneral'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = {};
      var controller = $controller('PasswordController', { $scope: $scope });
      $scope.password = 'longerthaneightchars';
      $scope.grade();
      expect($scope.strength).toEqual('strong');
    });
  });
});
