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
  ADJECTIVE = "adj.",
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

  console.log(
    'Basic info: \n\nGame pulls randomly from my personal vocab list of ~200 words.\n\nChoosing "dont know it" will end your streak but incur no point penalty.\n\nChoosing "know it" and selecting the correct answer awards a point. Selecting the wrong answer deducts a point.'
  );
  const wordBank = WORD_LIST.map((entry) => {
    const { word, definition } = entry;
    const correctDef = definition;
    const dedupedPool = WORD_LIST.filter((entry) => entry.word !== word);
    let definitionPool = dedupedPool;

    if (entry.partOfSpeech === PART_OF_SPEECH.ADJECTIVE) {
      definitionPool = dedupedPool.filter(
        (entry) => entry.partOfSpeech === PART_OF_SPEECH.ADJECTIVE
      );
    }
    if (entry.partOfSpeech === PART_OF_SPEECH.NOUN) {
      definitionPool = dedupedPool.filter(
        (entry) => entry.partOfSpeech === PART_OF_SPEECH.NOUN
      );
    }

    // get 3 wrong definitions, disallowing duplicates
    const idxA = randInRange(0, definitionPool.length);
    const idxB = uniqRandInRange(0, definitionPool.length, [idxA]);
    const idxC = uniqRandInRange(0, definitionPool.length, [idxA, idxB]);
    const wrongDefA = definitionPool[idxA].definition;
    const wrongDefB = definitionPool[idxB].definition;
    const wrongDefC = definitionPool[idxC].definition;

    // fill definitions array with correct answer + 3 wrong answers
    const definitions = new Array(4).fill(null);
    const correctIdx = randInRange(0, 3);
    definitions[correctIdx] = correctDef;
    definitions[definitions.indexOf(null)] = wrongDefA;
    definitions[definitions.indexOf(null)] = wrongDefB;
    definitions[definitions.indexOf(null)] = wrongDefC;

    return { word, definitions, correctIdx };
  });

  // TODO: make game length configurable
  return _.shuffle(wordBank).slice(0, 25);
};

const randInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

const uniqRandInRange = (min: number, max: number, exclusions: number[]) => {
  let num = randInRange(min, max);
  while (exclusions.includes(num)) {
    num = randInRange(min, max);
  }
  return num;
};
