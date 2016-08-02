/*
otsimo.logic.updateGrid=function(x:int,y:int)
otsimo.logic.sdasf=function(x:int,y:int)
otsimo.logic.setGridUpdater=function(updater:IUpdater)

*/
// document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });
//localStorage Settings

/*window.onscroll = function(event) {
  event.preventDefault();
}*/
document.ontouchmove = function(event){
    event.preventDefault();
}


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

function clickCover(){
  document.getElementById("derivableCover").style.display = "none";
}


/*
var statusSettings = 0;

function toggleSettings(){
  if(statusSettings != 1){
    document.getElementById("settings").style.right = "0px";
    statusSettings = 1;
  }else{
    document.getElementById("settings").style.right = "-270px";
    statusSettings = 0;
  }
}*/


var runUygulama = null;

var uygulama = angular.module("ngPescGeneral", ["ngTouch"]);
uygulama.controller('ngControlGeneral', function ($scope, $http, $timeout) {
    // $scope.currentPage = "Current Page";
    // scope.currentTab = "main";

    // SYS Variables (Private for View)
    $scope.currentGroup = ""; // If exists
    $scope.currentDerivable = ""; // If exists
    $scope.mainPageNo = 0;
    $scope.mainMaxPageNo = 0;
    $scope.groupPageNo = 0;
    $scope.groupMaxPageNo = 0;

    $scope.currentPhrase = [];

    var changeCurrentTab = function (tabExp) {

        if (tabExp == "main") {
            $scope.currentPage = $scope.pageText1;
        } else if (tabExp == "group") {
            $scope.currentPage = $scope.pageText2 + capitalize($scope.currentGroup);
        } else if (tabExp == "derivable") {
            $scope.currentPage = $scope.pageText3 + capitalize($scope.currentDerivable);
        } else if (tabExp == "recent") {
            $scope.currentPage = $scope.pageText4;
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
            //do nothing
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
      	otsimo.tts.speak(wordObj.title);
    }
    $scope.touchWord = function(wordT){
        var wordElem = document.getElementById("word-" + wordT);
        wordElem.className = wordElem.className + " gridItemClick";
        setTimeout(function(){
          wordElem.className = wordElem.className.replace(" gridItemClick", "");
        }, 200);
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
            otsimo.tts.speak(currentPhraseString);
        }
    }

    $scope.loadRecentPhrase = function(index){
        var phraseHistory = getHistoryAsArray();
        var phrase2Add = phraseHistory[phraseHistory.length - (index + 1)].phrase;
        $scope.currentPhrase = $scope.currentPhrase.concat(phrase2Add);
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
        $scope.gridSizeStatic = [gridX, gridY];
        $scope.gridQuantity = gridX * gridY;
    };

    function checkPortLand(){
      var gridSizeTemp = $scope.gridSizeStatic;
      if(screen.orientation.type == "portrait-primary"){
        $scope.gridSize = [gridSizeTemp[1], gridSizeTemp[0]];
        $scope.$apply();
      }else if(screen.orientation.type == "landscape-primary"){
        $scope.gridSize = [gridSizeTemp[0], gridSizeTemp[1]];
        $scope.$apply();
      }
    }

    window.addEventListener("orientationchange", function() {
    	// Announce the new orientation number
      // console.log(screen.orientation.type);
      checkPortLand();
    }, false);




    var setSettings = function(){

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

    }





    //Main Action

    runUygulama = function logic(x, y) {
        setSettings();
        $scope.changeGridSize(x, y);
        $scope.changeInterval(1);
        changeCurrentTab("main");
        checkPortLand();
    }


        // Touch

        var bstouchTimer;
        $scope.bsTouchStart = function () {
            document.getElementById("bs").style.color = "red";
            bstouchTimer = setTimeout(function () {
                $scope.currentPhrase = [];
                $scope.$apply();
            }, 500);
        }

        $scope.bsTouchEnd = function () {
            document.getElementById("bs").style.color = "#444";
            clearTimeout(bstouchTimer);
        }

        // Touch Derive

        var derivetouchTimer;
        $scope.deriveTouchStart = function (sytitle, deriveData, slug) {
          if(deriveData[0]){
            derivetouchTimer = setTimeout(function () {
              document.getElementById("derivableCover").style.display = "block";
                $scope.currentDerivable = sytitle;
                $scope.derivableSymbolData = deriveData;
                changeCurrentTab("derivable");
                $scope.$apply();
            }, 300);
            /*
            setTimeout(function(){
              document.getElementById("derivableCover").style.display = "none";
            }, 1000);
            */
          }
              var wordElem = document.getElementById("word-"+ slug);
              wordElem.className = wordElem.className + " gridItemClick";
              setTimeout(function(){
                wordElem.className = wordElem.className.replace(" gridItemClick", "");
              }, 300);

        }

        $scope.deriveTouchEnd = function () {
            clearTimeout(derivetouchTimer);
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
  var otsGridSize = otsimo.settings.gridsize.split("grid-")[1];
  var otsGridXY = otsGridSize.split("x");
  changeGridSize(otsGridXY[0], otsGridXY[1]);
});

var responsiveVoiceDriver = {}

responsiveVoiceDriver.speak = function (text) {
    if (responsiveVoice) {
        responsiveVoice.speak(text);
    }
}

responsiveVoiceDriver.setVoice = function (voice) {
    if (responsiveVoice) {
        responsiveVoice.setDefaultVoice(voice);
    }
}

responsiveVoiceDriver.getVoice = function () {
    return ""
}

responsiveVoiceDriver.voiceList = function () {
    return [];
}

otsimo.run(function () {
    if (!otsimo.isWKWebView) {
        otsimo.tts.setDriver(responsiveVoiceDriver);
        otsimo.tts.setVoice("UK English Female");
    }

    var otsGridSize = otsimo.settings.gridsize.split("grid-")[1];
    var otsGridXY = otsGridSize.split("x");
    runUygulama(otsGridXY[0], otsGridXY[1]);
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
