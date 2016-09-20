/* eslint-env jasmine */
import { module, inject } from 'mocks'
import LSManager from "./localstorage"

let localstorage = new LSManager();

describe('getHistoryAsArray', () => {
  let word1 = {};
  word1.title = "sample1";
  word1.slug = "sample1";
  word1.type = "naun";
  word1.class = "derive";
  word1.parent = "main";
  word1.style = "gridType-noun";
  let word2 = {};
  word2.title = "sample2";
  word2.slug = "sample2";
  word2.type = "naun";
  word2.class = "word";
  word2.parent = "main";
  word2.style = "gridType-noun";
  let samplePhrase = [word1, word2];
  beforeEach(() => {
    localStorage.phraseHistory = '[{"phrase":[{"title":"değil","slug":"değil","type":"noun","class":"word","parent":"main","style":"gridType-noun"},{"title":"kaplumbağa","slug":"kaplumbağa","type":"noun","class":"word","parent":"hayvanlar","style":"gridType-noun"},{"title":"aslan","slug":"aslan","type":"noun","class":"word","parent":"hayvanlar","style":"gridType-noun"},{"title":"koyun","slug":"koyun","type":"noun","class":"word","parent":"hayvanlar","style":"gridType-noun"},{"title":"kelebek","slug":"kelebek","type":"noun","class":"word","parent":"hayvanlar","style":"gridType-noun"}],"time":1473232105695},{"phrase":[{"title":"değil","slug":"değil","type":"noun","class":"word","parent":"main","style":"gridType-noun"},{"title":"babaannem","slug":"babaannem","type":"noun","class":"word","parent":"insanlar","style":"gridType-noun"}],"time":1473232819800},{"phrase":[{"title":"kar","slug":"kar","type":"noun","class":"word","parent":"doğa","style":"gridType-noun"},{"title":"deniz","slug":"deniz","type":"noun","class":"word","parent":"doğa","style":"gridType-noun"}],"time":1473233325367},{"phrase":[{"title":"o","slug":"o","type":"noun","class":"derive","parent":"main","style":"gridType-noun"},{"title":"seviyorum","slug":"seviyorum","type":"noun","class":"derive","parent":"main","style":"gridType-noun"}],"time":1473235018102},{"phrase":[{"title":"evet","slug":"evet","type":"noun","class":"word","parent":"sohbet","style":"gridType-noun"},{"title":"istiyorum","slug":"istiyorum","type":"noun","class":"derive","parent":"main","style":"gridType-noun"},{"title":"değil","slug":"değil","type":"noun","class":"word","parent":"main","style":"gridType-noun"},{"title":"gidiyorum","slug":"gidiyorum","type":"noun","class":"derive","parent":"main","style":"gridType-noun"},{"title":"omuz","slug":"omuz","type":"noun","class":"word","parent":"vücut","style":"gridType-noun"},{"title":"kulak","slug":"kulak","type":"noun","class":"word","parent":"vücut","style":"gridType-noun"}],"time":1473236466056},{"phrase":[{"title":"o","slug":"o","type":"noun","class":"derive","parent":"main","style":"gridType-noun"},{"title":"seviyorum","slug":"seviyorum","type":"noun","class":"derive","parent":"main","style":"gridType-noun"},{"title":"diş macunu","slug":"diş-macunu","type":"noun","class":"word","parent":"eşyalar","style":"gridType-noun"}],"time":1473236841817},{"phrase":[{"title":"iyi geceler","slug":"iyi-geceler","type":"noun","class":"word","parent":"sohbet","style":"gridType-noun"},{"title":"günaydın","slug":"günaydın","type":"noun","class":"word","parent":"sohbet","style":"gridType-noun"}],"time":1473236882704},{"phrase":[{"title":"istiyorum","slug":"istiyorum","type":"noun","class":"derive","parent":"main","style":"gridType-noun"},{"title":"istiyorum","slug":"istiyorum","type":"noun","class":"derive","parent":"main","style":"gridType-noun"},{"title":"değil","slug":"değil","type":"noun","class":"word","parent":"main","style":"gridType-noun"}],"time":1473237347528},{"phrase":[{"title":"kulak","slug":"kulak","type":"noun","class":"word","parent":"vücut","style":"gridType-noun"},{"title":"ayak","slug":"ayak","type":"noun","class":"word","parent":"vücut","style":"gridType-noun"},{"title":"dudak","slug":"dudak","type":"noun","class":"word","parent":"vücut","style":"gridType-noun"},{"title":"kol","slug":"kol","type":"noun","class":"word","parent":"vücut","style":"gridType-noun"}],"time":1473238803888}]';

  });

  it('should return an array', () => {
    expect(localstorage.getHistoryAsArray()
        .length)
      .toBeGreaterThan(0);
  });
  describe('returned array', () => {
    it('should have objects with "phrase" and "time" properties', () => {
      localstorage.getHistoryAsArray()
        .forEach((h) => {
          expect(h.phrase)
            .toBeDefined();
          expect(h.time)
            .toBeDefined();
        });
    });
  });

  describe('time property', () => {
    it('should be a number', () => {
      localstorage.getHistoryAsArray()
        .forEach((h) => {
          expect(h.time)
            .toBeGreaterThan(0);
        });
    });
  });

  describe('phrase property', () => {
    it('should be array of symbol objects with atleast 1 object', () => {
      localstorage.getHistoryAsArray()
        .forEach((h) => {
          expect(h.phrase.length)
            .toBeGreaterThan(0);
        });
    });
  });

  describe('symbol objects in the phrase', () => {
    it('should have title, slug, type, class, parent and style property', () => {

      localstorage.getHistoryAsArray()
        .forEach((h) => {
          h.phrase.forEach((p) => {
            expect(p.title)
              .toBeDefined();
            expect(p.slug)
              .toBeDefined();
            expect(p.type)
              .toBeDefined();
            expect(p.class)
              .toBeDefined();
            expect(p.parent)
              .toBeDefined();
            expect(p.style)
              .toBeDefined();
          });
        });
    });
  });
  describe('updateHistoryAsString', () => {
    it('should update the localStorage.phraseHistory data to the given string', () => {
      localstorage.updateHistoryAsString("asdasdasd");
      expect(localStorage.phraseHistory)
        .toBe('"asdasdasd"');
    });
  });

  describe('addPhrase2History', () => {
    it('should push a new phrase to the history', () => {
      localstorage.addPhrase2History(samplePhrase);
      expect(localstorage.getHistoryAsArray()[localstorage.getHistoryAsArray()
          .length - 1].phrase.length)
        .toBe(2);
      expect(localstorage.getHistoryAsArray()[localstorage.getHistoryAsArray()
          .length - 1].phrase[0].title)
        .toBe("sample1");
      expect(localstorage.getHistoryAsArray()[localstorage.getHistoryAsArray()
          .length - 1].phrase[1].title)
        .toBe("sample2");
      expect(localstorage.getHistoryAsArray()[localstorage.getHistoryAsArray()
          .length - 1].time)
        .toBeGreaterThan(0);
    });
    it('should not add duplicate phrase entity', () => {
      localstorage.addPhrase2History(samplePhrase);
      localstorage.addPhrase2History(samplePhrase);
      expect(localstorage.getHistoryAsArray()[localstorage.getHistoryAsArray()
          .length - 1].phrase)
        .not
        .toBe(localstorage.getHistoryAsArray()[localstorage.getHistoryAsArray()
          .length - 2].phrase);
    });
  });
});
