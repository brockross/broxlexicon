const events = require("events");
const fs = require("fs");
const readline = require("readline");

const FILE_PATH = "./vocab.md";

type WordDatum = {
  word: string;
  definition: string;
};

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
  fs.writeFileSync("./test.json", JSON.stringify(words));
};

processFile();

const checkIsWordLine = (line: string): boolean => {
  return line.includes("**");
};

const getWordDatum = (line: string): WordDatum | null => {
  const chunks = line.split("**");
  const word = chunks[1];
  const definitionChunk = chunks[2];
  if (!word || !definitionChunk) {
    return null;
  }

  const processedWord = word.trim().toLowerCase();

  const trimmedDef = definitionChunk.trim();
  const defWithoutLeadingHyphen = trimmedDef.slice(1);
  const processedDef = defWithoutLeadingHyphen.trim();

  return { word: processedWord, definition: processedDef };
};
