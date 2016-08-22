/*
  -- grid.js
  Directive and controller for grids and the grid elements;

*/

const PAGE_DERIVABLE = "derivable";
const PAGE_MAIN = "main";
const PAGE_GROUP = "group";
const PAGE_RECENT = "recent";

const CLASS_MAIN="main";

aacApp.directive('grid', function () {
    return {
        templateUrl: 'template/grid.html'
    };
});

aacApp.controller('otsControlGrid', function ($scope, $global) {

    $scope.PageNo = 0;
    $scope.MaxPageNo = 0;
    var prevPageNo = 0;
    var prevGroupStack = [];
    var prevDerivableStack = [];

    $scope.tabs = {};

    $scope.tabs[PAGE_MAIN] = function () {
        $scope.mainDataUnpaged = $global.mainArray.filter(function (f) {
            return (f.parent == CLASS_MAIN)
        });
        updateGridSlicing();
    }

    $scope.tabs[PAGE_DERIVABLE] = function () {
        prevPageNo = $scope.PageNo;
        if(prevDerivableStack[prevDerivableStack.length - 1] != $global.currentDerivable){
          prevDerivableStack.push($global.currentDerivable);
        }
        $scope.PageNo = 0;
        $scope.mainDataUnpaged = $global.mainArray.filter(function (f) {
            return (f.parent == $global.currentDerivable)
        });
        updateGridSlicing();
    }

    $scope.tabs[PAGE_GROUP] = function () {
        prevPageNo = $scope.PageNo;
        if(prevGroupStack[prevGroupStack.length - 1] != $global.currentGroup){
          prevGroupStack.push($global.currentGroup);
        }
        $scope.PageNo = 0;
        $scope.mainDataUnpaged = $global.mainArray.filter(function (f) {
            return (f.parent == $global.currentGroup)
        });
        updateGridSlicing();
    }

    $scope.tabs[PAGE_RECENT] = function () {
        $global.recentPhrases = getHistoryAsArray();
    }

    $global.changeTab = function (tabExp) {
        var t = $scope.tabs[tabExp];
        if (t) {
            t();
        } else {
            console.error(tabExp, ": Unknown Tab");
        }
    }

    var sliceArray = function(symbolQuantity){
      if($global.isHome == 1 && $scope.PageNo != 0){
        $scope.mainData = $scope.mainDataUnpaged.slice(parseInt($scope.PageNo * symbolQuantity + 1), parseInt(($scope.PageNo + 1) * symbolQuantity + 1)).map(mapStyle);
      }else{
        $scope.mainData = $scope.mainDataUnpaged.slice($scope.PageNo * symbolQuantity, ($scope.PageNo + 1) * symbolQuantity).map(mapStyle);
      }
      $scope.MaxPageNo = returnMaxPage();

    }

    var mapStyle = function(symbol){
        if(symbol.class == "group"){
          symbol.style = "gridGroup";
        }else{
          symbol.style = "gridType-"+symbol.type;
        }
        return symbol;
    }
    var returnMaxPage = function () {
          return maxC = Math.ceil($scope.mainDataUnpaged.length / $global.gridQuantity + 0.0001) - 1;
    }


    $scope.goBack = function () {
      prevGroupStack.pop();
        $scope.PageNo = prevPageNo;
        var prevGroup = prevGroupStack[prevGroupStack.length - 1];
        var prevDerivable = prevDerivableStack[prevDerivableStack.length - 1];

        if(prevGroup){
          $global.currentGroup = prevGroup;
          $global.changeCurrentTab(PAGE_GROUP);
        }else if(prevDerivable){
          $global.currentDerivable = prevDerivable;
          $global.changeCurrentTab(PAGE_DERIVABLE);
        }else{
          $global.currentGroup = "";
          $global.currentDerivable = "";
          $global.changeCurrentTab(PAGE_MAIN);
        }

        updateGridSlicing();
    }

    $scope.goNextMain = function () {
        $scope.PageNo++;
        updateGridSlicing();
    }

    $scope.goPrevMain = function () {
        $scope.PageNo--;
        updateGridSlicing();
      }

      function updateGridSlicing(){
        var sliceAmount;
        if($global.isHome == 1 && $scope.PageNo == 0){
          sliceAmount = $global.gridQuantity - 1;
        }else{
          sliceAmount = $global.gridQuantity - 2;
        }
        sliceArray(sliceAmount);
        animateSlicing();
      }

      $global.go2FirstPage = function(){
        $scope.PageNo = 0;
        updateGridSlicing();
      }

      $global.getPage = function(){
        return $scope.PageNo;
      }

    function animateSlicing(){
      var elemGridHolder = document.getElementById("gridHolder");
        document.getElementById("gridHolder").className = "gridHolder gridSlicingAnim";
        setTimeout(function(){
          elemGridHolder.className = "gridHolder gridNoAnim";
        },200);
    }

    $global.updateGridQuantity = function () {
        if ($global.currentTab != PAGE_MAIN) {
            $global.gridQuantity = $global.gridSize[0] * $global.gridSize[1] - 1;
        } else {
            if ($scope.PageNo == 0) {
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

    $global.checkOrientation = function (orientation) {
      console.log("orientation: "+ orientation);
        var gridSizeTemp = $global.gridSizeStatic;
        if (orientation) {
            //production
            if (orientation == "portrait" || orientation == "upside-down") {
                $global.gridSize = [gridSizeTemp[1], gridSizeTemp[0]];
                $scope.$apply();
            } else if (orientation == "landscape-left" || orientation == "landscape-right") {
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

    //production orientation Listender
    otsimo.onResolutionChanged(function(width, height, orientation){
      $global.checkOrientation(orientation);
    });

    //development orientation Listender
    window.addEventListener("orientationchange", function () {
     $global.checkOrientation();
    }, false);

});
