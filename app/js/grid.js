aacApp.factory('$symbol', function($http, $global){
  var main;
    $http.get("data/main_en.json").then(function (resp) {
      $global.main = resp.data.main;
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
    $global.updateTab = function (tabExp) {
        if (tabExp == "main") {
            $global.groupPageNo = 0;
            $scope.mainSymbolData = $global.main;
            calcPageCount($global.main.length);

        } else if (tabExp == "derivable") {
            //do nothing
        } else if (tabExp == "group") {
            var lengthFiltered = 0;
            var i = 0;
            $http.get("data/symbol.json").then(function (resp) {
                if (resp.status == 200) {
                    $scope.groupSymbolData = resp.data.symbols;
                    calcPageCountGroup(resp.data.symbols.filter(function(s){
                      return s.group_slug==$global.currentGroup;
                    }).length);

                }
            });

        } else if (tabExp == "recent") {
            $global.recentPhrases = getHistoryAsArray();
        }
    }

    function calcPageCount(len) {
        $global.mainMaxPageNo = len / $global.gridQuantity;
    }

    function calcPageCountGroup(len) {
        $global.groupMaxPageNo = Math.floor(len / $global.gridQuantity);
    }


    /*
    -- Card Navigation Functions (Click Functions)
    Functions to navigate between cards and group holders

    */

    $scope.groupClick = function (slug) {
        $global.currentGroup = slug;
        $global.changeCurrentTab("group");
        $global.updateGridQuantity();

        otsimo.customevent("app:group", { "group_slug": slug });
    }

    $scope.goBack = function () {
        $global.changeCurrentTab("main");
        $global.currentGroup = "";
        $global.updateGridQuantity();
    }

    $scope.goNextGroup = function () {
        $global.groupPageNo++;
        $global.updateGridQuantity();
    }

    $scope.goNextMain = function () {
        $global.mainPageNo++;
        $global.updateGridQuantity();
    }

    $scope.goPrevMain = function () {
        $global.mainPageNo--;
        $global.updateGridQuantity();
    }


    /*
    -- Word & Phrase Building Action Functions
    Functions to change (Addword, removeWord) and reflect changes to the currentPhrase.
    Functions to manage the interval of the recentPhrase history.

    */
    $scope.clickWord = function (wordObj) {
        $scope.add2Phrase(wordObj);
        updateCurrentPhraseScroll();
        otsimo.tts.speak(wordObj.title);
        otsimo.customevent("app:word", { "word": wordObj.title, "grid_x": $global.gridSize[0], "grid_y": $global.gridSize[1], "grid_xy": $global.gridSize[0] + "x" + $global.gridSize[1] });
    }
    $scope.touchWord = function (wordT, ind) {
        var wordElem;
        if (ind || ind === 0) {
            wordElem = document.getElementById("word-" + wordT + "-" + ind);
        } else {
            wordElem = document.getElementById("word-" + wordT);
        }
        wordElem.className = wordElem.className + " gridItemClick";
        setTimeout(function () {
            wordElem.className = wordElem.className.replace(" gridItemClick", "");
        }, 200);
    }


    $scope.add2Phrase = function (obj) {
        console.log("add2Phrase", $global.currentPhrase, obj);
        $global.currentPhrase.push(obj);
    }

    /*
    -- Touch Animations
    Functions to animate the hold and click actions
    on picture cards and backspace (bs) in the grid.
    */

    var wordTouchTimer;
    $scope.wordTouchStart = function (sytitle, deriveData, slug) {
        if (deriveData[0]) {
            wordTouchTimer = setTimeout(function () {
                document.getElementById("derivableCover").style.display = "block";
                $global.currentDerivable = sytitle;
                otsimo.customevent("app:derive", { "derivative": slug });
                $scope.derivableSymbolData = deriveData;
                $global.changeCurrentTab("derivable");
                $scope.$apply();
            }, 300);
        }
        var wordElem = document.getElementById("word-" + slug);
        wordElem.className = wordElem.className + " gridItemClick";
        setTimeout(function () {
            wordElem.className = wordElem.className.replace(" gridItemClick", "");
        }, 300);

    }

    $scope.wordTouchEnd = function (objMain, derivable) {
        clearTimeout(wordTouchTimer);
        if (!derivable) {
            $scope.clickWord(objMain);
        }
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
