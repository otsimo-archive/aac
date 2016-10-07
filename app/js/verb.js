function verbConj(verb, tence) {
  return verb;
}


function addPossessive(verb, possessor, tence) {
  if (possessor == "it") {
    return verb + "s";
  } else {
    return verb;
  }
}

export function englishConjunctor(verb, tence, possessor) {
  return addPossessive(verbConj(verb, tence), possessor, tence);
}
