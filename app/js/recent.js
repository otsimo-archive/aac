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

});
