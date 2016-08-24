/*
  -- phrase.js
  Directive and controller for phrase building block (under header);

*/

aacApp.directive('phrase', function () {
    return {
        templateUrl: 'template/phrase.html'
    };
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
        document.getElementById("bs").style.color = otsimo.kv.removeHoldColor;
        bstouchTimer = setTimeout(function () {
            $global.currentPhrase.splice(0, $global.currentPhrase.length);
            $scope.$apply();
        }, 500);
    }

    $scope.bsTouchEnd = function () {
        document.getElementById("bs").style.color = otsimo.kv.removeNormalColor;
        clearTimeout(bstouchTimer);
    }

    $global.getValidSlug = function(slug){
      console.log("checking this slug");
      return $global.mainSlugMap[slug];
    }


});
