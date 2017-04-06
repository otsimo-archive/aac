import {capitalize} from '../../js/utils'
import * as CONSTANT from '../../js/constants'

/**
 *
 *
 * @export
 * @class HeaderController
 */
export default class HeaderController {
    /**
	 * Creates an instance of HeaderController.
	 *
	 * @param {any} $scope
	 * @param {any} $global
	 * @param {any} $timeout
	 *
	 * @memberOf HeaderController
	 */
    constructor($scope, $global, $timeout) {
        console.log("HEADER MOUNTED");
        this.$scope = $scope;
        this.global = $global;
        this.$timeout = $timeout;
        // Initilize variables for controller.

        // Call controllerInit
        this.controllerInit();
    }
    /**
		 * Create or facilitate new functions for $scope or $global service.
		 */
    controllerInit() {
        this.global.changeCurrentTab = this.changeCurrentTab.bind(this);
    }

    /**
	 * This function handles the text and variable changes
	 * on the view when the tab is changed.
	 * Also calles changeTab function.
	 *
	 * @param {string} tabExp - new tab name
	 */
    changeCurrentTab(tabExp) {
        if (tabExp === CONSTANT.TAB_MAIN) {
            this.global.currentPage = this.$scope.pageText1;
            this.global.isHome = 1;
        } else if (tabExp === CONSTANT.TAB_GROUP) {
            this.global.currentPage = this.$scope.pageText2 + capitalize(this.global.currentGroup);
            this.global.isHome = 0;
        } else if (tabExp === CONSTANT.TAB_DERIVABLE) {
            this.global.currentPage = this.$scope.pageText3 + capitalize(this.global.currentDerivable);
            this.global.isHome = 0;
        } else if (tabExp === CONSTANT.TAB_RECENT) {
            this.global.currentPage = this.$scope.pageText4;
            this.global.isHome = 0;
        } else if (tabExp === CONSTANT.TAB_KEYBOARD) {
            this.global.currentPage = this.$scope.pageText5;
            this.global.isHome = 0;
        }

        if (tabExp === CONSTANT.TAB_RECENT || tabExp === CONSTANT.TAB_KEYBOARD) {
            this.global.currentTab = tabExp;
        } else {
            this.global.currentTab = CONSTANT.TAB_MAIN;
            this.global.changeTab(tabExp);
        }
    }

    /**
	 * Opens recent tab.
	 */
    openRecent() {
        this.changeCurrentTab(CONSTANT.TAB_RECENT);
        // Animate Recent Icon
        this.animIconTouch('rIcon');
    }
    /**
		 * Initilize Going the entrance screen when;
		 * Current tab is not main or,
		 * The page is not 0 or,
		 * there is a currentGroup or currentDerivable
		 */
    goHome() {
        let gCarrier = document.getElementById("generalCarrier");
        if (gCarrier) {
            gCarrier.style.height = "100%";
        }
        if (this.global.currentTab !== CONSTANT.TAB_MAIN || this.global.getPage() !== 0 || this.global.currentGroup || this.global.currentDerivable) {
            // Animate Home Icon
            this.animIconTouch('hIcon');

            this.global.changeCurrentTab(CONSTANT.TAB_MAIN);
            this.global.currentGroup = '';
            this.global.currentDerivable = '';
            this.global.go2FirstPage();
            this.updateGridQuantity();
        }
    }
    /**
		 * Opens the grid page
		 */
    openGrid() {
        let gCarrier = document.getElementById("generalCarrier");
        if (gCarrier) {
            gCarrier.style.height = "100%";
        }
        if (this.global.currentTab !== CONSTANT.TAB_MAIN) {
            // Animate Grid Icon
            this.animIconTouch('gIcon');
            this.global.changeCurrentTab(CONSTANT.TAB_MAIN);
        }
    }
    /**
		 * Opens the keyboard page
		 */
    openKeyboard() {
        let gCarrier = document.getElementById("generalCarrier");
        if (gCarrier) {
            gCarrier.style.height = "2000px";
        }
        if (this.global.currentTab !== CONSTANT.TAB_KEYBOARD) {
            // Animate Grid Icon
            this.animIconTouch('kIcon');
            this.global.changeCurrentTab(CONSTANT.TAB_KEYBOARD);
        }
    }
    /**
		 * Quits the application and turns back to Otsimo app hub if the isHome is true.
		 * Else, get the app to home (goHome)
		 */
    quitGame() {
        // Special animation for Back icon.
        let backIconElem = document.getElementById('bIcon');
        if (backIconElem) {
            backIconElem.className = 'backIcon backIconHovered';
            this.$timeout(() => backIconElem.className = 'backIcon', 300);
        }
        if (this.global.isHome === 1) {
            otsimo.quitgame();
        } else {
            this.goHome();
        }
    }
    /**
		 * Does animation for icon's DOM that is given.
		 *
		 * @param {string} iconId - the icon id
		 */
    animIconTouch(iconId) {
        let IconElem = document.getElementById(iconId);
        if (IconElem) {
            IconElem.className = 'material-icons iconOpacity';
            this.$timeout(() => IconElem.className = 'material-icons', 300);
        }
    }

    /**
         * Updates the quantity of the symbols in the grid
         * with respect to the current page/view.
         */
    updateGridQuantity() {
        let x = this.global.gridSize[0];
        let y = this.global.gridSize[1];
        let gridQuantity;
        if (this.global.currentTab !== CONSTANT.TAB_MAIN) {
            gridQuantity = (x * y) - 1;
        } else {
            if (this.$scope.pageNo === 0) {
                gridQuantity = x * y;
            } else {
                gridQuantity = (x * y) - 1;
            }
        }
        this.global.gridQuantity = gridQuantity;
    }

}

// Service Dependency Injection
HeaderController.$inject = ['$scope', '$global', '$timeout'];
