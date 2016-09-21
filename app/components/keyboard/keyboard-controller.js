import { returnTime } from 'js/utils';

/**
 * KeyboardController
 * @export
 * @class KeyboardController
 */
export default class KeyboardController {
  /**
   * Creates an instance of KeyboardController.
   *
   * @param {any} $scope
   * @param {any} $global
   *
   * @memberOf RecentController
   */
  constructor($scope, $global) {
    this.$scope = $scope;
    this.$scope.global = $global;

    // Initilize variables for controller.

    // Call controllerInit
    this.controllerInit();
  }

  /**
   * Create or facilitate new functions for $scope or $global service.
   */
  controllerInit() {}
}

// Service Dependency Injection
KeyboardController.$inject = ['$scope', '$global'];
