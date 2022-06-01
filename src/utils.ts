import _ from "lodash";
import WORD_DATA from "../word-list.json";
import type { WordDatum } from "../get-word-data";

const WORD_LIST: WordDatum[] = WORD_DATA;

type WordBankItem = {
  word: string;
  definitions: [string, string, string, string];
  correctIdx: number;
};
export const getWordBank = (): WordBankItem[] => {
  // map over WORD_LIST, and for each word, create a WordBankItem
  // the definitions array on the WordBankItem should be comprised of 3 random definitions from the WORD_LIST, along with the correct def
  // dedupe defs? maybe just increment one if there's a collision

  const wordBank = WORD_LIST.map((entry) => {
    const { word, definition } = entry;
    const correctDef = definition;
    const wrongDefA = WORD_LIST[randInRange(0, WORD_LIST.length)].definition;
    const wrongDefB = WORD_LIST[randInRange(0, WORD_LIST.length)].definition;
    const wrongDefC = WORD_LIST[randInRange(0, WORD_LIST.length)].definition;

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
