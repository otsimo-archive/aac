/*
  -- keyboard.js
  Directive and controller for the words the user input via keyboard;

*/

aacApp.directive('keyboard', function () {
    return {
        templateUrl: 'template/keyboard.html'
    };
});

aacApp.controller('otsControlKeyboard', function ($scope, $global) {
  var winCurrent = window.innerHeight;
  $scope.fnc = function(){
    setTimeout(function(){
      console.log(parseInt(winCurrent - window.innerHeight)+'px');
    }, 2000);
  }

});
