/*
  -- recent.js
  Directive and controller for phrase history in the app;

*/

aacApp.directive('recent', function () {
    return {
        templateUrl: 'template/recent.html'
    };
});
aacApp.controller('otsControlRecent', function ($scope, $global) {
    $scope.loadRecentPhrase = function (index) {
        var phraseHistory = getHistoryAsArray();
        var phrase2Add = phraseHistory[phraseHistory.length - (index + 1)].phrase;
        $global.currentPhrase = $global.currentPhrase.concat(phrase2Add);
    }

    $scope.changeInterval = function (val) {
        var timeH;
        var timeC = returnTime();
        var timeL;
        const halfHour = 1000 * 60 * 30;
        const oneDay = halfHour * 2 * 24;
        const oneWeek = oneDay * 7;
        if (val == 1) {
            timeH = timeC;
            timeL = timeC - halfHour;
        } else if (val == 2) {
            timeH = timeC - halfHour;
            timeL = timeC - oneDay * 24;
        } else if (val == 3) {
            timeH = timeC - oneDay;
            timeL = timeC - oneDay * 2;
        } else if (val == 4) {
            timeH = timeC - oneDay * 2;
            timeL = timeC - oneWeek;
        }
        $scope.timeH = timeH;
        $scope.timeL = timeL;
        otsimo.customevent("app:time_interval", { "recent_time_interval": val });
    }

    $scope.changeInterval(1);

});
