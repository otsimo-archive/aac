/*
  -- symbol.js
  Directive and controller for symbol elements in the grid;
  Touch-start, touch-end and animation functions.
*/

aacApp.directive('symbol', function () {
    return {
        templateUrl: 'template/symbol.html'
    };
});


aacApp.controller('otsControlSymbol', function ($scope, $http, $timeout, $global) {

      var wordTouchTimer;
      var currentlyHolding;
      $scope.wordTouchStart = function (wordObj, index) {
          currentlyHolding = wordObj.title;
              wordTouchTimer = setTimeout(function () {

                if (wordObj.class == "derive") {
                  $global.currentDerivable = wordObj.slug;
                  otsimo.customevent("app:derive", { "derivative": wordObj.slug });
                  $global.changeCurrentTab(PAGE_DERIVABLE);
                }else if(wordObj.class == "group") {
                  $global.currentGroup = wordObj.slug;
                  $global.changeCurrentTab(PAGE_GROUP);
                  /*
                  Category animation killing in touchEnd:
                  */
                }
                  $scope.$apply();
                  clickAnimStop();
              }, 300);

          clickAnimStart(index);
      }

      $scope.wordTouchEnd = function (wordObj, index) {
          clearTimeout(wordTouchTimer);
              if (currentlyHolding == wordObj.title && wordObj.class != "group") {
                  $scope.clickWord(wordObj);
              }
              if(wordObj.class=="group"){
                  $global.currentGroup = wordObj.slug;
                  $global.changeCurrentTab(PAGE_GROUP);
              }
          clickAnimEnd(index);
      }


      var clickAnimStart = function(index) {
        var elem = document.getElementById("item-"+index);
        elem.className = elem.className + " gridItemClick";
        $scope.currentAnimIndex = index;
      }

      var clickAnimEnd = function(index) {
        var elem = document.getElementById("item-"+index);
        elem.className = elem.className.replace(" gridItemClick", "");
      }

      var clickAnimStop = function(){
        var elem = document.getElementById("item-" + $scope.currentAnimIndex)
        elem.className = elem.className.replace(" gridItemClick", "") + " transitionKill";
        setTimeout(function(){
          elem.className = elem.className.replace(" transitionKill", "");
        }, 101);
      }

      $scope.clickWord = function (wordObj) {
          $global.currentPhrase.push(wordObj);
          updateCurrentPhraseScroll();
          otsimo.tts.speak(wordObj.title);
          otsimo.customevent("app:word", { "word": wordObj.title, "grid_x": $global.gridSize[0], "grid_y": $global.gridSize[1], "grid_xy": $global.gridSize[0] + "x" + $global.gridSize[1] });
      }

});
