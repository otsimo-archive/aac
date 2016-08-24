/*
  -- app.js
  Main JS file
  Main Controller and $global service is located here.
  - Global service has global variables that any controller that injects the $global.
  - setSettings() makes one time setting update before app is loaded.
  - runApp() function is called after otsimo.run() is initilized.

*/

var runApp = null;

var aacApp = angular.module("otsPescGeneral", ["ngTouch", "as.sortable"]);

aacApp.factory('$global', function () {
    var global = {
        currentPhrase: [],
        mainArray: [],
        mainSlugArray: [],
        mainSlugMap: [],
        phraseIndex: 1,
        isHome: 1,
        currentTab: "",
        currentPage: "",
        currentDerivable: "",
        currentGroup: "",
        gridSize: [0, 0],
        gridSizeStatic: [0, 0],
        gridQuantity: 0
    };

    return global;
});



aacApp.controller('otsControlGeneral', function ($scope, $http, $timeout, $global) {

  $scope.global = $global;

    var setSettings = function () {
        $global.pageText1 = otsimo.kv.pageText1;
        $global.pageText2 = otsimo.kv.pageText2;
        $global.pageText3 = otsimo.kv.pageText3;
        $global.pageText4 = otsimo.kv.pageText4;
        $global.pageText5 = otsimo.kv.pageText5;
        $global.startTyping = otsimo.kv.startTyping;
        $global.language = otsimo.child.language;
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
        if(otsimo.capabilities.indexOf("tts") == -1){
          document.getElementById("outdated").style.display = "block";
        }
    }

    runApp = function logic(x, y) {
        setSettings();
        if(deviceType() == "phone"){
          if(x > 6){ x = 6; }
          if(y > 4){ y = 4; }
        }
        /*Preload keyboard*/
        $global.changeCurrentTab("keyboard");

        $global.changeGridSize(x, y);

          $http.get(otsimo.kv.jsonPath).then(function (resp) {
              $global.mainArray = resp.data.symbols;
              $global.mainArray.forEach(function(obj){

                $global.mainSlugMap[obj.slug] = obj.slug;

                $global.mainSlugArray.push(obj.slug);
                if(obj.synonym.length > 0){
                  obj.synonym.forEach(function(syn){
                    $global.mainSlugArray.push(syn);
                    $global.mainSlugMap[syn] = obj.slug;
                  });
                }
              });
              $global.changeCurrentTab(PAGE_MAIN);
          });

        $global.checkOrientation();
    }

});
