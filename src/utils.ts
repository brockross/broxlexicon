import _ from "lodash";
import WORD_DATA from "../word-list.json";
import { WordDatum } from "../get-word-data";

const WORD_LIST: WordDatum[] = WORD_DATA;

type WordBankItem = {
  word: string;
  definitions: [string, string, string, string];
  correctIdx: number;
};
enum PART_OF_SPEECH {
  ADJECTIVE = "adjective.",
  NOUN = "noun.",
  VERB = "verb.",
  MISC = "misc.",
}

export const getWordBank = (): WordBankItem[] => {
  // map over WORD_LIST, and for each word, create a WordBankItem
  // the definitions array on the WordBankItem should be comprised of 3 random definitions from the WORD_LIST, along with the correct def
  // dedupe defs? maybe just increment one if there's a collision

  // account for part of speech -- try to include only defs whose part of speech matches the word
  // problem here: adj. and noun. have plenty of candidates, but with my current data, verb and misc have < 10 each--they'll constanly repeat. Maybe for now I only bother grouping nouns and adjectives, and let answers for other parts of speech populate from the full def pool

  const wordBank = WORD_LIST.map((entry) => {
    const { word, definition } = entry;
    const correctDef = definition;
    let definitionPool = WORD_LIST;

    if (entry.partOfSpeech === PART_OF_SPEECH.ADJECTIVE) {
      definitionPool = WORD_LIST.filter(
        (entry) => entry.partOfSpeech === PART_OF_SPEECH.ADJECTIVE
      );
    }
    if (entry.partOfSpeech === PART_OF_SPEECH.NOUN) {
      definitionPool = WORD_LIST.filter(
        (entry) => entry.partOfSpeech === PART_OF_SPEECH.NOUN
      );
    }

    const wrongDefA =
      definitionPool[randInRange(0, definitionPool.length)].definition;
    const wrongDefB =
      definitionPool[randInRange(0, definitionPool.length)].definition;
    const wrongDefC =
      definitionPool[randInRange(0, definitionPool.length)].definition;

    const definitions = new Array(4).fill(null);
    const correctIdx = randInRange(0, 3);
    definitions[correctIdx] = correctDef;
    definitions[definitions.indexOf(null)] = wrongDefA;
    definitions[definitions.indexOf(null)] = wrongDefB;
    definitions[definitions.indexOf(null)] = wrongDefC;

    return { word, definitions, correctIdx };
  });

  return _.shuffle(wordBank);
};

const randInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};
