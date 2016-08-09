/*
  -- symbol.js
  Directive and controller for symbol elements in the grid;

*/

aacApp.directive('symbol', function () {
    return {
        templateUrl: 'template/symbol.html'
    };
});


aacApp.controller('otsControlSymbol', function ($scope, $http, $timeout, $global, $symbol) {

      var wordTouchTimer;
      var currentlyHolding;
      $scope.wordTouchStart = function (wordObj, index) {
          currentlyHolding = wordObj.title;
          if (wordObj.class == "derive") {
              wordTouchTimer = setTimeout(function () {
                  $global.currentDerivable = wordObj.slug;
                  otsimo.customevent("app:derive", { "derivative": wordObj.slug });
                  $global.changeCurrentTab(PAGE_DERIVABLE);
                  $scope.$apply();
              }, 300);
          }
          clickAnimStart(wordObj, index);
      }

      $scope.wordTouchEnd = function (wordObj, index) {
          clearTimeout(wordTouchTimer);
          if (wordObj.class == "group") {
              $global.currentGroup = wordObj.slug;
              $global.changeCurrentTab(PAGE_GROUP);
          } else {
              if (currentlyHolding == wordObj.title && wordObj.class != "group") {
                  $scope.clickWord(wordObj);
              }
          }

          clickAnimEnd(wordObj, index);
      }


      var clickAnimStart = function(word, index) {
        var elem = document.getElementById("item-"+word.slug+"-"+index);
        elem.className = elem.className + " gridItemClick";
      }

      var clickAnimEnd = function(word, index) {
        var elem = document.getElementById("item-"+word.slug+"-"+index);
        elem.className = elem.className.replace(" gridItemClick", "");
      }

      $scope.clickWord = function (wordObj) {
          $scope.add2Phrase(wordObj);
          updateCurrentPhraseScroll();
          otsimo.tts.speak(wordObj.title);
          otsimo.customevent("app:word", { "word": wordObj.title, "grid_x": $global.gridSize[0], "grid_y": $global.gridSize[1], "grid_xy": $global.gridSize[0] + "x" + $global.gridSize[1] });
      }

      $scope.add2Phrase = function (obj) {
          console.log("add2Phrase", $global.currentPhrase, obj);
          $global.currentPhrase.push(obj);
      }

});
