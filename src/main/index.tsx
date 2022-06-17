import React, { useState, useRef } from "react";

import { getWordBank } from "../utils";
import { ChoicesView } from "./game-views/choices";
import { DontKnowView } from "./game-views/dont-know";
import { StartView } from "./game-views/start";

enum GAME_VIEW {
  START = "start",
  DONT_KNOW = "dont-know",
  CHOICES = "choices",
}

export function Main() {
  // put wordBank in a ref so we don't re-randomize the list on every render
  const wordBank = useRef(getWordBank());

  // game view state
  const [gameView, setGameView] = useState(GAME_VIEW.START);

  // keep track of current position in wordBank
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentWord = wordBank.current[currentIdx];
  const correctDefinition = currentWord.definitions[currentWord.correctIdx];

  // scoring state
  const [totalScore, setTotalScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // make a new descriptive heading here
  const handleIsKnownClick = (isKnown: boolean) => {
    if (isKnown) {
      setGameView(GAME_VIEW.CHOICES);
    } else {
      setStreak(0);
      setGameView(GAME_VIEW.DONT_KNOW);
      setNextIsEnabled(true);
    }
  };

  // selection/next logic
  const [nextIsEnabled, setNextIsEnabled] = useState(false);
  const handleNextClick = () => {
    setCurrentIdx(currentIdx + 1);
    setGameView(GAME_VIEW.START);
    setNextIsEnabled(false);
  };

  // card choice logic
  const handleCardChoice = (isCorrect: boolean) => {
    if (isCorrect) {
      setTotalScore(totalScore + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    setNextIsEnabled(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-body font-bold text-sm text-stone-600">
          ( broxlexicon )
        </h1>
        <div className="font-body font-light text-xs">
          <p>score: {totalScore}</p>
          <p>streak: {streak}</p>
        </div>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-title font-bold tracking-wide text-stone-800">
          {currentWord.word}
        </h2>
      </div>
      {gameView === GAME_VIEW.START && (
        <StartView handleOptionClick={handleIsKnownClick} />
      )}
      {gameView === GAME_VIEW.DONT_KNOW && (
        <DontKnowView correctDefinition={correctDefinition} />
      )}
      {gameView === GAME_VIEW.CHOICES && (
        <ChoicesView
          definitions={currentWord.definitions}
          correctIdx={currentWord.correctIdx}
          handleCardChoice={handleCardChoice}
        />
      )}

      <div className="flex mt-3">
        <button
          className="border-2 border-stone-600 m-auto rounded-md px-2 my-2 w-20 m-auto font-body font-medium disabled:text-stone-400 disabled:border-stone-400"
          disabled={!nextIsEnabled}
          onClick={handleNextClick}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
