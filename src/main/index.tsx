import React, { useState, useRef } from "react";
import styled from "styled-components";

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
    <Container>
      <Word>{currentWord.word}</Word>
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
      <NextButton disabled={!nextIsEnabled} onClick={handleNextClick}>
        {">>"}
      </NextButton>
      <p>Score: {totalScore}</p>
      <p>Streak: {streak}</p>
    </Container>
  );
}

const Container = styled.div``;
const Word = styled.h2``;
const CardsContainer = styled.div``;
const NextButton = styled.button``;
