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
  $scope.showKeyboard = function(){
    document.getElemenyById("typeInput").focus();

    setTimeout(function(){
      document.body.style.height = parseInt(window.innerHeight)+'px';
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }, 200);
  }

});
