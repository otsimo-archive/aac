/*
  -- keyboard.js
  Directive and controller for the words the user input via keyboard;

*/

aacApp.directive('keyboard', function () {
    return {
        templateUrl: 'template/keyboard.html'
    };
});

aacApp.controller('otsControlKeyboard', function ($scope, $global) {

  $scope.showKeyboard = function(){
    document.getElementById("typeInput").focus();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    
    $scope.showKeyboardFocused();
  };

  $scope.showKeyboardFocused = function(){
      setTimeout(function(){
        document.body.style.height = parseInt(window.innerHeight)+'px';
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        console.log("virtual keyboard opened!");
      }, 300);
    };

  $scope.hideKeyboard = function(){
      document.body.style.height = "100%";
  };

  $scope.submitCurrentInput = function(){
      var typeInput = document.getElementById("typeInput");
      if(typeInput.value){
        var inputWord = {};
        inputWord.title = typeInput.value.toLowerCase();
        inputWord.slug = typeInput.value.toLowerCase().replace(" ", "-");
        var checkExist = $global.checkWordInDB(inputWord.slug);
        inputWord.slugExist = !checkExist;

        if(inputWord.title.contains(" ") && !checkExist){
          recognizeWord(inputWord.title);
        }else{
          $global.currentPhrase.push(inputWord);
        }

        updateCurrentPhraseScroll();
        otsimo.tts.speak(inputWord.title);
        typeInput.value = "";
      }
  };

  $scope.enterSubmit = function($event){
    if($event.keyCode == 13){
      $scope.submitCurrentInput();
    }
  }

  var recognizeWord = function(word){
    console.log(word);
  }


$scope.$watch('$viewContentLoaded', function(){
  $scope.showKeyboard();
 });

 $global.checkWordInDB = function(word){
   return $global.mainSlugArray.contains(word);
 }

});
