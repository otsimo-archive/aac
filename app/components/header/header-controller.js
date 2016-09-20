import { capitalize } from '../../js/utils'
import * as CONSTANT from '../../js/constants'

/**
 *
 *
 * @export
 * @class HeaderController
 */
export class HeaderController {
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
      this.$scope = $scope;
      this.$scope.global = $global;
      this.$timeout = $timeout;
      // Initilize variables for controller.

      // Call controllerInit
      this.controllerInit();
    }
    /**
     * Create or facilitate new functions for $scope or $global service.
     */
  controllerInit() {
    this.$scope.global.changeCurrentTab = this.changeCurrentTab.bind(this);
  }

  /**
   * This function handles the text and variable changes
   * on the view when the tab is changed.
   * Also calles changeTab function.
   *
   * @param {string} tabExp - new tab name
   */
  changeCurrentTab(tabExp) {
      if (tabExp == CONSTANT.TAB_MAIN) {
        this.$scope.global.currentPage = this.$scope.pageText1;
        this.$scope.global.isHome = 1;
      } else if (tabExp == CONSTANT.TAB_GROUP) {
        this.$scope.global.currentPage = this.$scope.pageText2 + capitalize(this.$scope.global.currentGroup);
        this.$scope.global.isHome = 0;
      } else if (tabExp == CONSTANT.TAB_DERIVABLE) {
        this.$scope.global.currentPage = this.$scope.pageText3 + capitalize(this.$scope.global.currentDerivable);
        this.$scope.global.isHome = 0;
      } else if (tabExp == CONSTANT.TAB_RECENT) {
        this.$scope.global.currentPage = this.$scope.pageText4;
        this.$scope.global.isHome = 0;
      }

      if (tabExp != CONSTANT.TAB_RECENT) {
        this.$scope.global.currentTab = CONSTANT.TAB_MAIN;
        this.$scope.global.changeTab(tabExp);
      } else {
        this.$scope.global.currentTab = CONSTANT.TAB_RECENT;
        // Animate Recent Icon
        this.animIconTouch('rIcon');
      }
    }
    /**
     * Opens recent tab.
     */
  openRecent() {
      this.changeCurrentTab(CONSTANT.TAB_RECENT);
    }
    /**
     * Initilize Going the entrance screen when;
     * Current tab is not main or,
     * The page is not 0 or,
     * there is a currentGroup or currentDerivable
     */
  goHome() {

      if (this.$scope.global.currentTab != CONSTANT.TAB_MAIN || this.$scope.global.getPage() != 0 || this.$scope.global.currentGroup || this.$scope.global.currentDerivable) {
        // Animate Home Icon
        this.animIconTouch('hIcon');

        this.$scope.global.changeCurrentTab(CONSTANT.TAB_MAIN);
        this.$scope.global.currentGroup = '';
        this.$scope.global.currentDerivable = '';
        this.$scope.global.go2FirstPage();
        this.$scope.global.updateGridQuantity();
      }
    }
    /**
     * Opens the grid page
     */
  openGrid() {
      if (this.$scope.global.currentTab != CONSTANT.TAB_MAIN) {
        // Animate Grid Icon
        this.animIconTouch('gIcon');
        this.$scope.global.changeCurrentTab(CONSTANT.TAB_MAIN);
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
      if (this.$scope.global.isHome == 1) {
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
}
