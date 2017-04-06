import * as CONSTANT from '../../js/constants';

/**
 *
 * @class GridController
 */
export default class GridController {
    /**
     * Creates an instance of GridController.
     *
     * @param {any} $scope
     * @param {any} $global
     * @param {any} $timeout
     * @param {TTSManager} TTSManager
     * @param {ConjunctionManager} ConjunctionManager
     *
     */
    constructor($scope, $global, $timeout, TTSManager, ConjunctionManager) {
        this.$scope = $scope;
        this.$scope.global = $global;
        this.global = $global;
        this.$timeout = $timeout;
        this.tts = TTSManager;
        this.conj = ConjunctionManager;

        // Initilize variables for controller.
        this.$scope.pageNo = 0;
        this.$scope.maxPageNo = 0;
        this.prevPageNo = 0;
        this.prevGroupStack = [];
        this.prevDerivableStack = [];

        // Call controllerInit
        this.controllerInit();
    }

    /**
     * Create or facilitate new functions for $scope or $global service.
     */
    controllerInit() {
        this.global.go2FirstPage = this.go2FirstPage.bind(this);
        this.global.getPage = this.getPage.bind(this);
        this.global.changeTab = this.changeTab.bind(this);
        this.global.pushToCurrentPhrase = this.pushToCurrentPhrase.bind(this);
    }

    /**
     * Handles logical actions about tab change.
     *
     * @param {string} tabExp - the ne tab
     */
    changeTab(tabExp) {
        let mArray = this.global.mainArray;
        switch (tabExp) {
            case CONSTANT.TAB_MAIN:
                this.$scope.mainDataUnpaged = mArray.filter((f) => f.parent === CONSTANT.CLASS_MAIN);
                break;
            case CONSTANT.TAB_DERIVABLE:
                this.prevPageNo = this.$scope.pageNo;
                this.pushNavigationHistory(CONSTANT.TAB_DERIVABLE);
                this.$scope.pageNo = 0;
                this.$scope.mainDataUnpaged = mArray.filter(f => f.parent === this.global.currentDerivable);
                break;
            case CONSTANT.TAB_GROUP:
                this.prevPageNo = this.$scope.pageNo;
                this.pushNavigationHistory(CONSTANT.TAB_GROUP);
                this.$scope.pageNo = 0;
                this.$scope.mainDataUnpaged = mArray.filter(f => f.parent === this.global.currentGroup);
                break;
        }
        this.updateGridSlicing();
    }
    /**
         * Stores the history of navigation (navigation history used for 'goback' navigation)
         *
         * @param {string} tab for history pushing
         */
    pushNavigationHistory(tab) {
        switch (tab) {
            case CONSTANT.TAB_DERIVABLE:
                let currentD = this.global.currentDerivable;
                if (this.prevDerivableStack[this.prevDerivableStack.length - 1] !== currentD) {
                    this.prevDerivableStack.push(currentD);
                }
                break;
            case CONSTANT.TAB_GROUP:
                let currentG = this.global.currentGroup;
                if (this.prevGroupStack[this.prevGroupStack.length - 1] !== currentG) {
                    this.prevGroupStack.push(currentG);
                }
                break;
        }
    }

    /**
     * Handles paging of the grid. Slices the currently showed array into grid size.
     *
     * @param {number} symbolQuantity
     */
    sliceArray(symbolQuantity) {
        if (this.global.isHome === 1 && this.$scope.pageNo !== 0) {
            this.$scope.mainData = this.$scope.mainDataUnpaged.slice(parseInt(this.$scope.pageNo * symbolQuantity + 1), parseInt((this.$scope.pageNo + 1) * symbolQuantity + 1)).map(this.mapStyle);
        } else {
            this.$scope.mainData = this.$scope.mainDataUnpaged.slice(this.$scope.pageNo * symbolQuantity, (this.$scope.pageNo + 1) * symbolQuantity).map(this.mapStyle);
        }
        this.$scope.maxPageNo = this.returnMaxPage();
    }

    /**
     * Gives appropriate classNames with respect to the class of the symbol
     * in the currently showing symbol array.
     *
     * @param {Object} symb - the symbol object
     * @returns {Object} the symbol object
     */
    mapStyle(symb) {
        if (symb.class === CONSTANT.CLASS_GROUP) {
            symb.style = 'gridGroup';
        } else {
            symb.style = 'gridType-' + symb.type;
        }
        return symb;
    }

    /**
     * Calculates the max page quantity.
     * in the currently showing symbol array.
     * @returns {number} max page
     */
    returnMaxPage() {
        return Math.ceil(this.$scope.mainDataUnpaged.length / this.global.gridQuantity + 0.0001) - 1;
    }

    /**
     * Navigation function to go to prior page or view.
     * Go back symbol only shows up when there is a prior view.
     */
    goBack() {
        this.prevGroupStack.pop();
        this.prevDerivableStack.pop();
        this.$scope.pageNo = this.prevPageNo;
        let prevGroup = this.prevGroupStack[this.prevGroupStack.length - 1];
        let prevDerivable = this.prevDerivableStack[this.prevDerivableStack.length - 1];

        if (this.prevGroup) {
            this.global.currentGroup = this.prevGroup;
            this.global.changeCurrentTab(CONSTANT.TAB_GROUP);
        } else if (this.prevDerivable) {
            this.global.currentDerivable = this.prevDerivable;
            this.global.changeCurrentTab(CONSTANT.TAB_DERIVABLE);
        } else {
            this.global.currentGroup = '';
            this.global.currentDerivable = '';
            this.global.changeCurrentTab(CONSTANT.TAB_MAIN);
        }

        this.updateGridSlicing();
    }

    /**
     * Navigation function to go to next page
     * In current symbol array.
     */
    goNextMain() {
        this.$scope.pageNo++;
        this.updateGridSlicing();
    }
    /**
         * Navigation function to go to previous page
         * In current symbol array.
         */
    goPrevMain() {
        if (this.$scope.pageNo !== 0) {
            this.$scope.pageNo--;
        }
        this.updateGridSlicing();
    }
    /**
         * Updates sliceAmount and calls sliceArray function
         * Also calls animateSlicing function.
         */
    updateGridSlicing() {
        let sliceAmount;
        if (this.global.isHome === 1 && this.$scope.pageNo === 0) {
            sliceAmount = this.global.gridQuantity - 1;
        } else {
            sliceAmount = this.global.gridQuantity - 2;
        }
        this.sliceArray(sliceAmount);
        this.animateSlicing();
        return sliceAmount;
    }

    /**
     * Navigates user to the first page
     * In the currently showing symbol array.
     * @returns {number} current pageNo for test
     */
    go2FirstPage() {
        let pageNo = this.$scope.pageNo = 0;
        this.updateGridSlicing();
        return pageNo;
    }

    /**
     * currently showing page's number.
     * @returns {number} the page number
     */
    getPage() {
        return this.$scope.pageNo;
    }

    /**
     * Adds animation to slicing (page or view changes)
     * By adding class to the carrier DOM element
     * Actual animations are handles in CSS.
     */
    animateSlicing() {
        let elemGridHolder = document.getElementById('gridHolder');
        if (elemGridHolder) {
            document.getElementById('gridHolder').className = 'gridHolder gridSlicingAnim';
            this.$timeout(() => {
                elemGridHolder.className = 'gridHolder gridNoAnim';
            }, 200);
        }
    }

    pushToCurrentPhrase(wordObj2Push, speak) {
        let wo2p = JSON.parse(JSON.stringify(wordObj2Push));
        let cp = this.$scope.global.currentPhrase;

        // Update word with custom languagePack function.
        wo2p = this.conj.beforePushing(wo2p, cp);

        this.$scope.global.currentPhrase.push(wo2p);
        if (speak == true) {
            this.tts.speak(wo2p.title);
        }
    }

    /**
         * Closes cover on clicking on it!
         */
    clickCover() {
        let cover = document.getElementById("symbolCover");
        if (cover) {
            cover.style.display = "none";
        }
        this.$scope.global.isDraggable = true;
    }
}
// Service Dependency Injection
GridController.$inject = ['$scope', '$global', '$timeout', 'TTSManager', 'ConjunctionManager'];
