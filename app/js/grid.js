aacApp.factory('$symbol', function($http, $global){
  var main;
    $http.get("data/main_en.json").then(function (resp) {
      $global.main = resp.data.symbols;
    });

      return{
        main: 1
      };
});


aacApp.directive('grid', function () {
    return {
        templateUrl: 'template/grid.html'
    };
});

aacApp.controller('otsControlGrid', function ($scope, $http, $timeout, $global, $symbol) {

    $global.changeTab = function (tabExp) {
      console.log("tabExp:+ "+tabExp);
        var symbolQuantity;
        if (tabExp == "main") {

            if($global.PageNo===0){
              symbolQuantity = $global.gridQuantity - 1;
            }else{
              symbolQuantity = $global.gridQuantity - 2;
            }
            $scope.mainDataUnpaged = $global.main.filter(function(f){
              return (f.parent == "main")
            });
            $scope.mainData = $scope.mainDataUnpaged.slice($global.PageNo*symbolQuantity, ($global.PageNo + 1)*symbolQuantity);
            $global.MaxPageNo = returnMaxPage();

        }else if (tabExp == "derivable") {

            symbolQuantity = $global.gridQuantity - 2;
            $scope.mainDataUnpaged = $global.main.filter(function(f){
              return (f.parent == $global.currentDerivable)
            })
            $scope.mainData = $scope.mainDataUnpaged.slice($global.PageNo*symbolQuantity, ($global.PageNo + 1)*symbolQuantity);
            $global.MaxPageNo = returnMaxPage();



        }else if (tabExp == "recent") {
            $global.recentPhrases = getHistoryAsArray();
        }
    }

    var returnMaxPage = function(){
       return parseInt($scope.mainDataUnpaged.length / $global.gridQuantity);
    }


    $scope.goBack = function () {
        $global.changeCurrentTab("main");
        $global.currentGroup = "";
    }

    $scope.goNextMain = function () {
        $global.PageNo++;
        $global.changeTab("main");
    }

    $scope.goPrevMain = function () {
        $global.PageNo--;
        $global.changeTab("main");
    }

    var wordTouchTimer;
    var currentlyHolding;
    $scope.wordTouchStart = function(wordObj){
      currentlyHolding = wordObj.title;
      if(wordObj.class=="derive"){
        wordTouchTimer = setTimeout(function () {
            //document.getElementById("derivableCover").style.display = "block";
            $global.currentDerivable = wordObj.slug;
            otsimo.customevent("app:derive", { "derivative": wordObj.slug });
            $global.changeCurrentTab("derivable");
            $scope.$apply();
        }, 300);
      }
      
    }

    $scope.wordTouchEnd = function (wordObj) {
      clearTimeout(wordTouchTimer);
        if(currentlyHolding == wordObj.title){
        $scope.clickWord(wordObj);
        }
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

    $global.changeInterval = function (val) {
        var timeH;
        var timeC = returnTime();
        var timeL;
        if (val == 1) {
            timeH = timeC;
            timeL = timeC - 1000 * 60 * 30;
        } else if (val == 2) {
            timeH = timeC - 1000 * 60 * 30;
            timeL = timeC - 1000 * 60 * 60 * 24;
        } else if (val == 3) {
            timeH = timeC - 1000 * 60 * 30 * 24;
            timeL = timeC - 1000 * 60 * 60 * 24 * 2;
        } else if (val == 4) {
            timeH = timeC - 1000 * 60 * 30 * 24 * 2;
            timeL = timeC - 1000 * 60 * 60 * 24 * 7;
        }
        $scope.timeH = timeH;
        $scope.timeL = timeL;
        otsimo.customevent("app:time_interval", { "recent_time_interval": val });
    }


    $global.updateGridQuantity = function () {
        if ($global.currentTab != "main") {
            $global.gridQuantity = $global.gridSize[0] * $global.gridSize[1] - 1;
        } else {
            if ($global.mainPageNo == 0) {
                $global.gridQuantity = $global.gridSize[0] * $global.gridSize[1];
            } else {
                $global.gridQuantity = $global.gridSize[0] * $global.gridSize[1] - 1;
            }
        }
    }

    $global.changeGridSize = function (gridX, gridY) {
        $global.gridSize = [gridX, gridY];
        $global.gridSizeStatic = [gridX, gridY];
        $global.gridQuantity = gridX * gridY;
    };

    $global.checkOrientation = function () {

        var gridSizeTemp = $global.gridSizeStatic;
        if (window.orientation) {
            //production
            if (window.orientation == ORIENTATION_TOP || window.orientation == ORIENTATION_BOTTOM) {
                $global.gridSize = [gridSizeTemp[1], gridSizeTemp[0]];
                $scope.$apply();
            } else if (window.orientation == ORIENTATION_LEFT || window.orientation == ORIENTATION_RIGHT) {
                $global.gridSize = [gridSizeTemp[0], gridSizeTemp[1]];
                $scope.$apply();
            }
        } else {
            //development
            if (screen.orientation.type == "portrait-primary") {
                $global.gridSize = [gridSizeTemp[1], gridSizeTemp[0]];
                $scope.$apply();
            } else if (screen.orientation.type == "landscape-primary") {
                $global.gridSize = [gridSizeTemp[0], gridSizeTemp[1]];
                $scope.$apply();
            }
        }
    }
    window.addEventListener("orientationchange", function () {
        // Announce the new orientation number
        // console.log(screen.orientation.type);
        $global.checkOrientation();
    }, false);

});
