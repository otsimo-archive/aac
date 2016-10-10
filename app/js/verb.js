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
*/

function vowelCheck(vowel) {
	if (vowel == "a" || vowel == "e" || vowel == "i" || vowel == "o") {
		return true;
	} else {
		return false;
	}
}

function secondFormat(verb) {
	if (vowelCheck(verb[verb.length - 1])) {
		return verb + "d";
	} else {
		return verb + "ed";
	}
}

function verbConj(verb, tence) {
	switch (tence) {
		case "simPresTence":
			return verb;
		case "simPastTence":
			return secondFormat(verb);
		case "simFutuTence":

		case "certFutuTence":
		case "presContTence":
		case "pastContTence":
		case "futuContTence":
		case "presPerfTence":
		case "presPerfContTence":
	}
}


function addPossessive(verb, possessor, tence) {
	switch (tence) {
		case "simPresTence":
			if (possessor == "he" ||  possessor == "she" || possessor == "it") {
				if (vowelCheck(verb[verb.length - 1])) {
					return verb + "s";
				} else {
					return verb + "es";
				}
			} else {
				return verb;
			}
		default:
			return verb;
	}

}

export function englishConjunctor(verb, tence, possessor) {
	return addPossessive(verbConj(verb, tence), possessor, tence);
}
