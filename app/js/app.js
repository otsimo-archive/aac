/*
  -- app.js
  Main JS file
  Angular modules and controllers is located here

*/

var runApp = null;
const ORIENTATION_TOP = 0;
const ORIENTATION_BOTTOM = 180;
const ORIENTATION_LEFT = 90;
const ORIENTATION_RIGHT = -90;

var aacApp = angular.module("otsPescGeneral", ["ngTouch"]);

aacApp.factory('$global',function(){
        return {
          currentPhrase: [],
          isHome: 1,
          currentTab: ""
        };
    });


aacApp.controller('otsControlGeneral', function ($scope, $http, $timeout, $global) {

    $scope.global = $global;

    //Variable Initialization
    $scope.mainPageNo = 0;
    $scope.mainMaxPageNo = 0;
    $scope.groupPageNo = 0;
    $scope.groupMaxPageNo = 0;
    $scope.currentGroup = "";
    $scope.currentDerivable = "";

    /*
    -- General Navigation Functions (Click Functions)
    Functions to navigate between Grid (main, group, derivative) and recentPhrases
    */
    $scope.changeCurrentTab = function (tabExp) {

        if (tabExp == "main") {
            $scope.currentPage = $scope.pageText1;
            $global.isHome = 1;
        } else if (tabExp == "group") {
            $scope.currentPage = $scope.pageText2 + capitalize($scope.currentGroup);
            $global.isHome = 0;
        } else if (tabExp == "derivable") {
            $scope.currentPage = $scope.pageText3 + capitalize($scope.currentDerivable);
            $global.isHome = 0;
        } else if (tabExp == "recent") {
            $scope.currentPage = $scope.pageText4;
            $global.isHome = 0;
        }

        $global.currentTab = tabExp;
        $scope.updateTab(tabExp);
    };


    $scope.updateTab = function (tabExp) {
        if (tabExp == "main") {
            $scope.groupPageNo = 0;
            $http.get(otsimo.kv.mainJsonPath).then(function (resp) {
                if (resp.status == 200) {
                    $scope.mainSymbolData = resp.data.main;

                    calcPageCount(resp.data.main.length);
                }
            });

        } else if (tabExp == "derivable") {
            //do nothing
        } else if (tabExp == "group") {
            var lengthFiltered = 0;
            var i = 0;
            $http.get("data/symbol.json").then(function (resp) {
                if (resp.status == 200) {
                    $scope.groupSymbolData = resp.data.symbols;

                    while (resp.data.symbols[i]) {
                        if (resp.data.symbols[i].group_slug == $scope.currentGroup) {
                            lengthFiltered++;
                        }

                        i++;
                    }

                    calcPageCountGroup(lengthFiltered);
                }
            });

        } else if (tabExp == "recent") {
            $scope.recentPhrases = getHistoryAsArray();
        }
    }



    function calcPageCount(len) {
        $scope.mainMaxPageNo = len / $scope.gridQuantity;
    }

    function calcPageCountGroup(len) {
        $scope.groupMaxPageNo = Math.floor(len / $scope.gridQuantity);
    }




    $scope.changeInterval = function (val) {
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




    /*
    -- Grid manipulation functions
    Functions to change-listen situation changes on grid size settings.
    - $scope.changeGridSize(x,y) - updated the grid variables into supplied Variables
    - $scope.checkOrientation() - checks the orientation type and changes the grid according to it.
    - $scope.updateGridQuantity() - updates the total size of picture cards that the grid can by currentTab.
    */

    $scope.changeGridSize = function (gridX, gridY) {
        $scope.gridSize = [gridX, gridY];
        $scope.gridSizeStatic = [gridX, gridY];
        $scope.gridQuantity = gridX * gridY;
    };

    $scope.checkOrientation = function () {

        var gridSizeTemp = $scope.gridSizeStatic;
        if (window.orientation) {
            //production
            if (window.orientation == ORIENTATION_TOP || window.orientation == ORIENTATION_BOTTOM) {
                $scope.gridSize = [gridSizeTemp[1], gridSizeTemp[0]];
                $scope.$apply();
            } else if (window.orientation == ORIENTATION_LEFT || window.orientation == ORIENTATION_RIGHT) {
                $scope.gridSize = [gridSizeTemp[0], gridSizeTemp[1]];
                $scope.$apply();
            }
        } else {
            //development
            if (screen.orientation.type == "portrait-primary") {
                $scope.gridSize = [gridSizeTemp[1], gridSizeTemp[0]];
                $scope.$apply();
            } else if (screen.orientation.type == "landscape-primary") {
                $scope.gridSize = [gridSizeTemp[0], gridSizeTemp[1]];
                $scope.$apply();
            }
        }
    }

    $scope.updateGridQuantity = function () {
        if ($global.currentTab != "main") {
            $scope.gridQuantity = $scope.gridSize[0] * $scope.gridSize[1] - 1;
        } else {
            if ($scope.mainPageNo == 0) {
                $scope.gridQuantity = $scope.gridSize[0] * $scope.gridSize[1];
            } else {
                $scope.gridQuantity = $scope.gridSize[0] * $scope.gridSize[1] - 1;
            }
        }
    }


    /*
    -- App Setting Initilizer and Updater Functions
    Initilize and updates the $scope variables that will be used in view

    */
    var setSettings = function () {
        $scope.pageText1 = otsimo.kv.pageText1;
        $scope.pageText2 = otsimo.kv.pageText2;
        $scope.pageText3 = otsimo.kv.pageText3;
        $scope.pageText4 = otsimo.kv.pageText4;
        $scope.timeIntervalText1 = otsimo.kv.timeIntervalText1;
        $scope.timeIntervalText2 = otsimo.kv.timeIntervalText2;
        $scope.timeIntervalText3 = otsimo.kv.timeIntervalText3;
        $scope.timeIntervalText4 = otsimo.kv.timeIntervalText4;
        $scope.previousText = otsimo.kv.previousText;
        $scope.nextText = otsimo.kv.nextText;
        $scope.backText = otsimo.kv.backText;
        $scope.completeChnges = otsimo.kv.completeChangesText;
        // Colors & styles
        $scope.headerColor = otsimo.kv.headerColor;
        $scope.generalFont = otsimo.kv.generalFont;
        document.getElementsByClassName("header")[0].style.background = $scope.headerColor;
        document.body.style.fontSize = $scope.generalFont;
        otsimo.tts.setVoice(otsimo.kv.voiceId);

    }

    runApp = function logic(x, y) {
        setSettings();
        $scope.changeGridSize(x, y);
        $scope.changeInterval(1);
        $scope.changeCurrentTab("main");
        $scope.checkOrientation();
    }

    window.addEventListener("orientationchange", function () {
        // Announce the new orientation number
        // console.log(screen.orientation.type);
        $scope.checkOrientation();
    }, false);
});

aacApp.controller('otsControlHeader', function ($scope, $global) {

    $scope.openRecent = function () {
        $scope.changeCurrentTab("recent");
        $scope.changeInterval(1);
    }

    $scope.goHome = function () {
        $scope.changeCurrentTab("main");
        $scope.currentGroup = "";
        $scope.currentDerivable = "";
        $scope.mainPageNo = 0;
        $scope.updateGridQuantity();
    }

    $scope.quitGame = function () {
        if ($global.isHome == 1) {
            otsimo.quitgame();
        } else {
            $scope.goHome();
        }
    }

    $scope.openGrid = function () {
        $scope.changeCurrentTab("main");
    }

});

aacApp.controller('otsControlPhrase', function ($scope, $http, $timeout, $global) {
    $scope.removeLastWord = function () {
        $global.currentPhrase.pop();
    }

    $scope.submitPhrase = function () {
        if ($global.currentPhrase.length > 0) {
            var i = 0;
            var currentPhraseString = "";
            $scope.currentPhraseTransition = "cpTransition";
            addPhrase2History($global.currentPhrase);

            $timeout(function () { $scope.currentPhraseTransition = ""; }, 300);
            while (i < $global.currentPhrase.length) {
                currentPhraseString = currentPhraseString + $global.currentPhrase[i].title + " ";
                i++;
            }
            otsimo.tts.speak(currentPhraseString);
            otsimo.customevent("app:phrase", { "phrase": currentPhraseString });
        }
    }



    var bstouchTimer;
    $scope.bsTouchStart = function () {
        document.getElementById("bs").style.color = "red";
        bstouchTimer = setTimeout(function () {
            $global.currentPhrase.splice(0, $global.currentPhrase.length);
            $scope.$apply();
        }, 500);
    }

    $scope.bsTouchEnd = function () {
        document.getElementById("bs").style.color = "#444";
        clearTimeout(bstouchTimer);
    }


});

aacApp.controller('otsControlGrid', function ($scope, $http, $timeout, $global) {


    /*
    -- Card Navigation Functions (Click Functions)
    Functions to navigate between cards and group holders

    */

    $scope.groupClick = function (slug) {
        $scope.currentGroup = slug;
        $scope.changeCurrentTab("group");
        $scope.updateGridQuantity();

        otsimo.customevent("app:group", { "group_slug": slug });
    }

    $scope.goBack = function () {
        $scope.changeCurrentTab("main");
        $scope.currentGroup = "";
        $scope.updateGridQuantity();
    }

    $scope.goNextGroup = function () {
        $scope.groupPageNo++;
        $scope.updateGridQuantity();
    }

    $scope.goNextMain = function () {
        $scope.mainPageNo++;
        $scope.updateGridQuantity();
    }

    $scope.goPrevMain = function () {
        $scope.mainPageNo--;
        $scope.updateGridQuantity();
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
        otsimo.customevent("app:word", { "word": wordObj.title, "grid_x": $scope.gridSize[0], "grid_y": $scope.gridSize[1], "grid_xy": $scope.gridSize[0] + "x" + $scope.gridSize[1] });
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
                $scope.currentDerivable = sytitle;
                otsimo.customevent("app:derive", { "derivative": slug });
                $scope.derivableSymbolData = deriveData;
                $scope.changeCurrentTab("derivable");
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

    $scope.loadRecentPhrase = function (index) {
        var phraseHistory = getHistoryAsArray();
        var phrase2Add = phraseHistory[phraseHistory.length - (index + 1)].phrase;
        $global.currentPhrase = $global.currentPhrase.concat(phrase2Add);
    }



});

aacApp.directive('header', function () {
    return {
        templateUrl: 'template/header.html'
    };
});

aacApp.directive('phrase', function () {
    return {
        templateUrl: 'template/phrase.html'
    };
});

aacApp.directive('grid', function () {
    return {
        templateUrl: 'template/grid.html'
    };
});
