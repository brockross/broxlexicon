const events = require("events");
const fs = require("fs");
const readline = require("readline");

const FILE_PATH = "./vocab.md";

export type WordDatum = {
  word: string;
  definition: string;
  partOfSpeech: string | null;
};
export enum PART_OF_SPEECH {
  ADJECTIVE = "adj.",
  NOUN = "noun.",
  VERB = "verb.",
  MISC = "misc.",
}

const words: WordDatum[] = [];

const processFile = async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream(FILE_PATH),
  });

  rl.on("line", (line: string) => {
    if (!checkIsWordLine(line)) {
      return;
    }
    const wordDatum = getWordDatum(line);
    if (wordDatum) {
      words.push(wordDatum);
    }
  });

  await events.once(rl, "close");
  fs.writeFileSync("./word-list.json", JSON.stringify(words));
};

processFile();

const checkIsWordLine = (line: string): boolean => {
  return line.includes("**");
};

const getWordDatum = (line: string): WordDatum | null => {
  // TODO this is mega brittle and will immediately break with the smallest formatting discrepancy in my notes. I should make it more robust
  const chunks = line.split("**");
  const word = chunks[1];
  const partOfSpeechAndDefChunk = chunks[2];
  const definition = partOfSpeechAndDefChunk.split("_")[2];
  let partOfSpeech: any = partOfSpeechAndDefChunk.split("_")[1];

  if (!word || !definition) {
    return null;
  }
  if (
    ![
      PART_OF_SPEECH.ADJECTIVE,
      PART_OF_SPEECH.NOUN,
      PART_OF_SPEECH.VERB,
      PART_OF_SPEECH.MISC,
    ].includes(partOfSpeech)
  ) {
    partOfSpeech = null;
  }

  const processedWord = word.trim().toLowerCase();
  const trimmedDef = definition.trim();

  return { word: processedWord, definition: trimmedDef, partOfSpeech };
};
