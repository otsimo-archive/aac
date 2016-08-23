/*
  -- core.js
  This file contains generic functions for other javascript files to use.
  Like returnTime(), capitalize() etc.

*/

document.ontouchmove = function(event){
    event.preventDefault();
}

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

function returnTime() {
    var d = new Date();
    return d.getTime();
}

function clickCover(){
  document.getElementById("derivableCover").style.display = "none";
}

function updateCurrentPhraseScroll() {
    setTimeout(function () {
        var element = document.getElementById("cPhrase");
        element.scrollLeft = element.scrollWidth - 924;
    }, 1);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function deviceType(){
  var type;
  if(window.innerWidth + window.innerHeight < 1500){
    type = "phone";
  }else{
    type = "tablet";
  }
  return type;
}

var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

/*
var statusSettings = 0;

function toggleSettings(){
  if(statusSettings != 1){
    document.getElementById("settings").style.right = "0px";
    statusSettings = 1;
  }else{
    document.getElementById("settings").style.right = "-270px";
    statusSettings = 0;
  }
}*/
