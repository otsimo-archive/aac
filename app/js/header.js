/*
  -- header.js
  Directive and controller for header in the app;

*/

aacApp.directive('header', function () {
    return {
        templateUrl: 'template/header.html'
    };
});

aacApp.controller('otsControlHeader', function ($scope, $global) {

    $scope.openRecent = function () {
        $global.changeCurrentTab(PAGE_RECENT);
        $global.changeInterval(1);
    }

    $scope.goHome = function () {
        $global.changeCurrentTab(PAGE_MAIN);
        $global.currentGroup = "";
        $global.currentDerivable = "";
        $global.mainPageNo = 0;
        $global.updateGridQuantity();
    }

    $scope.quitGame = function () {
        if ($global.isHome == 1) {
            otsimo.quitgame();
        } else {
            $scope.goHome();
        }
    }

    $scope.openGrid = function () {
        $global.changeCurrentTab(PAGE_MAIN);
    }


    $global.changeCurrentTab = function (tabExp) {

        if (tabExp == "main") {
            $global.currentPage = $global.pageText1;
            $global.isHome = 1;
        } else if (tabExp == "group") {
            $global.currentPage = $global.pageText2 + capitalize($global.currentGroup);
            $global.isHome = 0;
        } else if (tabExp == "derivable") {
            $global.currentPage = $global.pageText3 + capitalize($global.currentDerivable);
            $global.isHome = 0;
        } else if (tabExp == "recent") {
            $global.currentPage = $global.pageText4;
            $global.isHome = 0;
        }
        if(tabExp != "recent"){
          $global.currentTab = "main";
        }else{
          $global.currentTab = "recent";
        }
        $global.changeTab(tabExp);
    };

});
