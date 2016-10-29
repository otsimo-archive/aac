/*
  Simple Present - simPresTence
  He lives
  I live
  --
  Simple Past - simPastTence
  I ate
  He ate
  --
  Simple Future - simFutuTence
  I will go
  He will go
  --
  Certain Future - certFutuTence
  I am going to go
  He is going to go
  --
  Present Continuous - presContTence
  I'm living
  He's living
  --
  Past Continuous - pastContTence
  I was living
  You were sleeping
  --
  Future Continuous - futuContTence
  He will be working
  I will be working
  --
  Present Perfect - presPerfTence
  I have eaten
  He has eaten
  --
  Present Perfect Continuous  - presPerfContTence
  He has been sleeping
  I have been sleeping
  --
	Ability - ableMode
	I can do
	You can do
	--
  Imperative Mode - imperMode
  He must wear clothes
  I must wear
  --
  Possiblity Mode - possibMode
  I might come
  You might come
  --
  Subjunctive Mode -- subjunMode
  I should cook
  You should cook
*/

const verbFormatMap = {
	"do": ["did", "did"],
	"go": ["went", "gone"],
	"get": ["got", "gotten"],
	"make": ["made", "made"],
	"have": ["had", "had"],
	"read": ["read", "read"],
	"come": ["came", "come"],
	"eat": ["ate", "eaten"],
	"see": ["saw", "seen"],
	"put": ["put", "put"],
	"let": ["let", "let"],
	"say": ["said", "said"],
	"speak": ["spoke", "spoken"],
	"teach": ["tought", "thought"],
	"tell": ["told", "told"],
	"write": ["wrote", "written"]
}


function vowelCheck(vowel) {
	if (vowel == "a" || vowel == "e" || vowel == "i" || vowel == "o") {
		return true;
	} else {
		return false;
	}
}

function secondFormat(verb) {

	if (verbFormatMap[verb]) {
		return verbFormatMap[verb][0];
	} else {
		if (vowelCheck(verb[verb.length - 1])) {
			return verb.substring(0, verb.length - 1) + "ed";
		} else {
			return verb + "ed";
		}
	}
}

function thirdFormat(verb) {
	if (verbFormatMap[verb]) {
		return verbFormatMap[verb][1];
	} else {
		if (vowelCheck(verb[verb.length - 1])) {
			return verb.substring(0, verb.length - 1) + "ed";
		} else {
			return verb + "ed";
		}
	}
}


function syntaxBeing(poss) {
	if (poss == "i") {
		return "am ";
	} else if (poss == "you" || poss == "we" || poss == "they") {
		return "are ";
	} else if (poss == "he" || poss == "she" || poss == "it") {
		return "is ";
	} else {
		return "";
	}

}

function pastFormOfBeing(poss) {
	switch (syntaxBeing(poss)) {
		case "are ":
			return "were "
		case "is ":
		case "am ":
			return "was ";
		default:
			return "";
	}

}


function addIng(verb) {
	if (vowelCheck(verb[verb.length - 1])) {
		return verb.substring(0, verb.length - 1) + "ing";
	} else {
		return verb + "ing";
	}
}

function addS(possessor, verb) {
	if (possessor == "he" ||  possessor == "she" || possessor == "it") {
		if (vowelCheck(verb[verb.length - 1])) {
			return verb + "s";
		} else {
			return verb + "es";
		}
	} else {
		return verb;
	}
}

function haveForm(possessor) {
	if (possessor == "he" ||  possessor == "she" || possessor == "it") {
		return "has ";
	} else if (possessor == "i" || possessor == "you" || possessor == "we" || possessor == "they") {
		return "have ";
	} else {
		return "";
	}
}

function verbConj(verb, tence) {
	switch (tence) {
		case "simPresTence":
			return verb;
		case "simPastTence":
			return secondFormat(verb);
		case "simFutuTence":
			return "will " + verb;
		case "certFutuTence":
			return "going to " + verb;
		case "presContTence":
			return addIng(verb);
		case "pastContTence":
			return addIng(verb);
		case "futuContTence":
			return "will be " + addIng(verb);
		case "presPerfTence":
			return thirdFormat(verb);
		case "presPerfContTence":
			return "been " + addIng(verb);
		case "imperMode":
			return "must " + verb;
		case "ableMode":
			return "can " + verb;
		case "possibMode":
			return "might " + verb;
		case "subjunMode":
			return "should " + verb;
	}
}

export function addPossessiveEn(verb, possessor, tence) {
	switch (tence) {
		case "simPresTence":
			return addS(possessor, verb);
		case "certFutuTence":
		case "presContTence":
			return syntaxBeing(possessor) + verb;
		case "pastContTence":
			return pastFormOfBeing(possessor) + verb;
		case "presPerfTence":
			return haveForm(possessor) + verb;
		case "presPerfContTence":
			return haveForm(possessor) + verb;
		default:
			return verb;
	}

}

export function englishConjunctor(verb, tence, possessor) {
	return addPossessiveEn(verbConj(verb, tence), possessor, tence);
}
