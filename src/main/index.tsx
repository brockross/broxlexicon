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
    }
  };

  // selection/next logic
  const [hasMadeSelection, setHasMadeSelection] = useState(false);
  const handleNextClick = () => {
    setClickedIdx(null);
    setHasMadeSelection(false);
    setCurrentIdx(currentIdx + 1);
    setShowCards(false);
  };

  // card click logic
  const [clickedIdx, setClickedIdx] = useState<null | number>(null);
  const handleCardClick = (idx: number) => () => {
    if (hasMadeSelection) {
      return;
    }
    if (idx === currentWord.correctIdx) {
      setTotalScore(totalScore + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    setHasMadeSelection(true);
    setClickedIdx(idx);
  };

  // halpers
  const getCardVariant = (
    cardIdx: number,
    clickedIdx: number | null,
    correctIdx: number
  ) => {
    if (cardIdx === clickedIdx) {
      return cardIdx === correctIdx ? "correct" : "incorrect";
    }
    return null;
  };

  return (
    <Container>
      <Word>{currentWord.word}</Word>
      <CardsContainer>
        {gameView === GAME_VIEW.START && (
          <StartView handleOptionClick={handleIsKnownClick} />
        )}
        {gameView === GAME_VIEW.DONT_KNOW && (
          <DontKnowView correctDefinition={correctDefinition} />
        )}
        {gameView === GAME_VIEW.CHOICES && (
          <ChoicesView definitions={currentWord.definitions} />
        )}
        {/* {showCards ? (
          currentWord.definitions.map((def, idx) => {
            return (
              <Card
                onClick={handleCardClick(idx)}
                $variant={getCardVariant(
                  idx,
                  clickedIdx,
                  currentWord.correctIdx
                )}
                key={`${def}-${idx}`}
              >
                {def}
              </Card>
            );
          })
        ) : (
          <div>
            <p onClick={() => handleIsKnownClick(true)}>I know it</p>
            <p onClick={() => handleIsKnownClick(false)}>I don't know it</p>
          </div>
        )} */}
      </CardsContainer>
      <NextButton disabled={!hasMadeSelection} onClick={handleNextClick}>
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
