import { returnTime, updateCurrentPhraseScroll } from 'js/utils';

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
   * @param {any} $timeout
   * @param {TTSManager} TTSManager
   *
   * @memberOf RecentController
   */
  constructor($scope, $global, $timeout, EventManager, TTSManager) {
    this.$scope = $scope;
    this.$scope.global = $global;
    this.$timeout = $timeout;
    this.tts = TTSManager;
    this.event = EventManager;
    this.fastTypeTimer = null;
    this.suggestions = false;
    // Initilize variables for controller.

    // Call controllerInit
    this.controllerInit();
  }

  /**
   * Create or facilitate new functions for $scope or $global service.
   */
  controllerInit() {
    this.phraseIndex = 0;
    this.suggestionList = [];
  }

  /**
   * Shows the keyboard
   */
  showKeyboard() {
    let typeInput = document.getElementById("typeInput");
    if (typeInput) {
      typeInput.focus();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    this.showKeyboardFocused();
  }

  /**
   * Removes readonly from typeInput
   * Triggered when type input is
   * Walkaround for ios autocorrect
   */
  showKeyboardFocused() {
    let typeInput = document.getElementById("typeInput");
    if (typeInput) {
      typeInput.removeAttribute('readonly');
      this.$timeout(() => {
        document.body.style.height = parseInt(window.innerHeight) + 'px';
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        console.log("virtual keyboard opened!");
      }, 300);
    }
  }

  /**
   * Hides the keyboard
   */
  hideKeyboard() {
    let typeInput = document.getElementById("typeInput");
    if (typeInput) {
      document.body.style.height = "100%";
    }
  }

  /**
   * Submits (handles) the current typeInput string content.
   */
  submitCurrentInput() {
    let typeInput = document.getElementById("typeInput");
    if (typeInput.value) {
      let inputWord = {};
      inputWord.title = typeInput.value.toLowerCase();
      inputWord.slug = typeInput.value.toLowerCase().replace(" ", "-");
      let checkExist = this.checkWordInDB(inputWord.slug);
      inputWord.slugExist = !checkExist;

      if (inputWord.title.contains(" ") && !checkExist) {
        this.recognizeWord(inputWord.title);
      } else {
        inputWord.phraseIndex = this.phraseIndex++;
        this.$scope.global.currentPhrase.push(inputWord);
      }
      updateCurrentPhraseScroll();
      this.tts.speak(inputWord.title);
      let gs = this.$scope.global.gridSize;
      this.event.appWord(inputWord.title, gs[0], gs[1]);
      typeInput.value = "";
    }
  }

  /**
   * Handles the submission of the input via "enter" from the device
   */
  enterSubmit($event) {
    if ($event.keyCode === 13) {
      this.submitCurrentInput();
      this.suggestionList = [];
    } else {
      let typeInput = document.getElementById("typeInput");
      if (typeInput) {
        // If there is a timeout, clear it.
        if (this.fastTypeTimer) {
          this.$timeout.cancel(this.fastTypeTimer);
        }
        this.fastTypeTimer = this.$timeout(() => {
          if (typeInput.value.length > 1) {
            this.suggestWordsByInput(typeInput.value);
          } else {
            this.suggestionList = [];
            this.suggestions = false;
          }
        }, 300);
      }
    }
  }

  /**
   * Handles, creates the data to set suggestions by,
   * current keyboard input.
   */
  suggestWordsByInput(searchLetter) {
    this.suggestions = true;
    searchLetter = searchLetter.toLocaleLowerCase();
    searchLetter = searchLetter.replace(" ", "-");
    this.suggestionList = this.$scope.global.mainSlugArray.filter((word) => {
      return word.substring(0, searchLetter.length) == searchLetter;
    });
    if (this.suggestionList.length > 0) {
      this.suggestionList.sort(this.sortByLength);
    }
  }

  /**
   * Handles actions when a suggestion symbol is clicked
   */
  clickSuggestion(wordSlug) {
    let wordObj2Push = {};
    wordObj2Push.title = wordSlug.replace("-", " ");
    wordObj2Push.slug = wordSlug;
    wordObj2Push.phraseIndex = this.phraseIndex++;
    this.$scope.global.currentPhrase.push(wordObj2Push);

    let typeInput = document.getElementById("typeInput");
    if (typeInput) {
      document.getElementById("typeInput").value = "";
    }
    this.suggestionList = [];
    this.suggestions = false;
  }

  /**
   * Recognizes the string given by the current word package before pushing.
   * Then pushes the pieces indivicually.
   */
  recognizeWord(word) {
    // this function can be better algorithmicly!
    let splittedUnrecognizedWord = word.split(" ");
    splittedUnrecognizedWord.forEach((wordPiece) => {
      if (wordPiece) {
        let wordObj2Push = {};
        wordObj2Push.title = wordPiece;
        wordObj2Push.slug = wordPiece;
        wordObj2Push.slugExist = !this.checkWordInDB(wordObj2Push.slug);
        wordObj2Push.phraseIndex = this.phraseIndex++;
        this.$scope.global.currentPhrase.push(wordObj2Push);
      }
    });
  }

  /**
   * Checks if the given word in the mainSlugArray
   */
  checkWordInDB(word) {
    return this.$scope.global.mainSlugArray.contains(word);
  }

  /**
   * Comparission function for .sort() prototype.
   */
  sortByLength(a, b) {
    if (a.length > b.length) {
      return 1;
    }
    if (a.length < b.length) {
      return -1;
    }
    return 0;
  }

}

// Service Dependency Injection
KeyboardController.$inject = ['$scope', '$global', '$timeout', 'EventManager', 'TTSManager'];
