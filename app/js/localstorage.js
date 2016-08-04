/*
  -- localstorage.js
  The recent phrase history is stored in the localstorage utility of HTML5
  This file contains an interface for other javascript files to interact
  with localstorage

*/


if (!localStorage.phraseHistory) {
    console.log("LS: not yet initilized, firstTime load.");
    localStorage.phraseHistory = "[]";
}

function getHistoryAsArray() {
    var tempHistoryArr = JSON.parse(localStorage.phraseHistory);
    return tempHistoryArr;
}
function updateHistoryAsString(tempArr) {
    localStorage.phraseHistory = JSON.stringify(tempArr);
}

function addPhrase2History(arrPhrase) {
    var tempHistoryArr = getHistoryAsArray();
    var stringifyLast;
    if (tempHistoryArr.length > 0) {
        stringifyLast = JSON.stringify(tempHistoryArr[tempHistoryArr.length - 1].phrase);
    }
    if (stringifyLast != JSON.stringify(arrPhrase)) {
        var obj2Push = {};
        obj2Push.phrase = arrPhrase;
        obj2Push.time = returnTime();
        //console.log(obj2Push.phrase);
        tempHistoryArr.push(obj2Push);
        updateHistoryAsString(tempHistoryArr);
    }
}
