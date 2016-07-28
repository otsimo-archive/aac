/*
otsimo.logic.updateGrid=function(x:int,y:int)
otsimo.logic.sdasf=function(x:int,y:int)
otsimo.logic.setGridUpdater=function(updater:IUpdater)

*/
// document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });
console.log("It is here 1")

//responsiveVoice.setDefaultVoice("UK English Female");

//localStorage Settings
if (!localStorage.phraseHistory) {
    console.log("LS: not yet initilized, firstTime load.");
    localStorage.phraseHistory = "[]";
}

function getHistoryAsArray() {
    var tempHistoryArr = JSON.parse(localStorage.phraseHistory);
    return tempHistoryArr;
}
function updateHistoryAsString(tempArr) {
    localStorage.phraseHistory = JSON.stringify(tempArr);
}

function addPhrase2History(arrPhrase) {
    var tempHistoryArr = getHistoryAsArray();
    var stringifyLast;
    if (tempHistoryArr.length > 0) {
        stringifyLast = JSON.stringify(tempHistoryArr[tempHistoryArr.length - 1].phrase);
    }
    if (stringifyLast != JSON.stringify(arrPhrase)) {
        var obj2Push = {};
        obj2Push.phrase = arrPhrase;
        obj2Push.time = returnTime();
        //console.log(obj2Push.phrase);
        tempHistoryArr.push(obj2Push);
        updateHistoryAsString(tempHistoryArr);
    }
}

function returnTime() {
    var d = new Date();
    return d.getTime();
}

var runUygulama = null;

var uygulama = angular.module("ngPescGeneral", ["ngTouch"]);
uygulama.controller('ngControlGeneral', function ($scope, $http, $timeout) {
    // $scope.currentPage = "Current Page";
    // scope.currentTab = "main";

    // SYS Variables (Private for View)
    $scope.currentGroup = "a"; // If exists
    $scope.currentDerivable = ""; // If exists
    $scope.mainPageNo = 0;
    $scope.mainMaxPageNo = 0;
    $scope.groupPageNo = 0;
    $scope.groupMaxPageNo = 0;

    $scope.currentPhrase = [];
    //Setting $scope variables
    //...
    var changeCurrentPageText = function (cPageText) {
        $scope.currentPage = cPageText;
    };

    var changeCurrentTab = function (tabExp) {

        if (tabExp == "main") {
            changeCurrentPageText("Main Picture Cards");
        } else if (tabExp == "group") {
            changeCurrentPageText("Group Cards Of " + capitalize($scope.currentGroup));
        } else if (tabExp == "derivable") {
            changeCurrentPageText("Derivables Of " + capitalize($scope.currentDerivable));
        } else if (tabExp == "recent") {
            changeCurrentPageText("Recent Phrases");
        }

        $scope.currentTab = tabExp;
        updateTab(tabExp);
    };

    var updateTab = function (tabExp) {
        if (tabExp == "main") {
            $scope.groupPageNo = 0;
            $http.get("symbol.json").then(function (resp) {
                if (resp.status == 200) {
                    $scope.mainSymbolData = resp.data.symbols;

                    calcPageCount(resp.data.symbols.length);
                }
            });

            $http.get("group.json").then(function (resp) {
                if (resp.status == 200) {
                    $scope.groupsSymbolData = resp.data.groups;
                }
            });

        } else if (tabExp == "derivable") {

            $http.get("symbol.json").then(function (resp) {
                if (resp.status == 200) {
                    $scope.derivableSymbolData = resp.data.symbols;
                }
            });

        } else if (tabExp == "group") {
            var lengthFiltered = 0;
            var i = 0;
            $http.get("symbol.json").then(function (resp) {
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

        // end updateTab;
    }

    //Click Functoions
    $scope.clickWord = function (wordObj) {
        add2Phrase(wordObj);
        updateScroll();
      		responsiveVoice.speak(wordObj.title);
    }

    $scope.removeLastWord = function () {
        $scope.currentPhrase.pop();
    }

    $scope.submitPhrase = function () {
        if ($scope.currentPhrase[0]) {
            var i = 0;
            var currentPhraseString = "";
            $scope.currentPhraseTransition = "cpTransition";
            addPhrase2History($scope.currentPhrase);

            $timeout(function () { $scope.currentPhraseTransition = ""; }, 300);
            while (i < $scope.currentPhrase.length) {
                currentPhraseString = currentPhraseString + $scope.currentPhrase[i].title + " ";
                i++;
            }
            responsiveVoice.speak(currentPhraseString);
        }
    }

    $scope.openRecent = function () {
        changeCurrentTab("recent");
        $scope.changeInterval(1);
    }

    $scope.openGrid = function () {
        changeCurrentTab("main");
    }

    //Main Tab Click Functions
    $scope.goNextMain = function () {
        $scope.mainPageNo++;
        checkNUpdateGridSize();
    }

    $scope.goPrevMain = function () {
        $scope.mainPageNo--;
        checkNUpdateGridSize();
    }

    // Click Functions for groups
    $scope.groupClick = function (slug) {

        $scope.currentGroup = slug;
        changeCurrentTab("group");
        // Current group is accessible in view.
        checkNUpdateGridSize();

    }

    $scope.goBack = function () {
        changeCurrentTab("main");
        $scope.currentGroup = "";
        checkNUpdateGridSize();
    }

    $scope.goNextGroup = function () {
        $scope.groupPageNo++;
        checkNUpdateGridSize();
    }



    //Click functions for history
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
    }


    //Settings Functions
    $scope.changeGridSize = function (gridX, gridY) {
        $scope.gridSize = [gridX, gridY];
        $scope.gridQuantity = gridX * gridY;
    };








    //Main Action

    runUygulama = function logic(x, y) {
        changeCurrentTab("main");
        $scope.changeGridSize(x, y);
        $scope.changeInterval(1);
    }


    // Touch

    var touchTimer;
    $scope.bsTouchStart = function () {
        document.getElementById("bs").style.color = "red";
        touchTimer = setTimeout(function () {
            $scope.currentPhrase = [];
        }, 300);
    }

    $scope.bsTouchEnd = function () {
        document.getElementById("bs").style.color = "#444";
        clearTimeout(touchTimer);
    }


    //unGeneric Functions for controller.
    function add2Phrase(obj) {
        $scope.currentPhrase.push(obj);
        //console.log($scope.currentPhrase);
    }

    function updateScroll() {
        setTimeout(function () {
            var element = document.getElementById("cPhrase");
            element.scrollLeft = element.scrollWidth - 924;
        }, 1);
    }
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function calcPageCount(len) {
        $scope.mainMaxPageNo = len / $scope.gridQuantity;
    }

    function calcPageCountGroup(len) {
        $scope.groupMaxPageNo = Math.floor(len / $scope.gridQuantity);
    }

    function checkNUpdateGridSize() {
        if ($scope.currentTab != "main") {
            $scope.gridQuantity = $scope.gridSize[0] * $scope.gridSize[1] - 1;
        } else {
            if ($scope.mainPageNo == 0) {
                $scope.gridQuantity = $scope.gridSize[0] * $scope.gridSize[1];
            } else {
                $scope.gridQuantity = $scope.gridSize[0] * $scope.gridSize[1] - 1;
            }
        }

    }

});



otsimo.onSettingsChanged(function (settings, sound) {
    //otsimo.game.sound.mute = !sound
});



otsimo.run(function () {
    console.log("It is here")
    runUygulama(5, 4);
    // Otsimo Run!
});




/*
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "json";
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};


window.onload = function () {

    var gridElem = document.getElementById("grids").innerHTML;
    var i = 0;
    var ngrid;
      getJSON("symbol.json", function(n, resp){
console.log(resp);
        while (i < resp.symbols.length) {
        ngrid = `
        <div class="gridItem">
          <img src="symbols/output/${resp.symbols[i].slug}">
          <div class="gridText">${resp.symbols[i].title}</div>
        </div>`;

          document.getElementById("grids").innerHTML = document.getElementById("grids").innerHTML + ngrid;
          i++;
      }

      });
}

*/

