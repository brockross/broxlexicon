import React, { useState, useRef } from "react";
import styled from "styled-components";

import { getWordBank } from "../utils";

export function Main() {
  // put wordBank in a ref so we don't re-randomize the list on every render
  const wordBank = useRef(getWordBank());

  // keep track of current position in wordBank
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentWord = wordBank.current[currentIdx];

  // scoring state
  const [totalScore, setTotalScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // cards hide/show logic
  const [showCards, setShowCards] = useState(false);
  const handleIsKnownClick = (isKnown: boolean) => {
    if (isKnown) {
      setShowCards(true);
    } else {
      setStreak(0);
      handleNextClick();
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
        {showCards ? (
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
        )}
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
const Word = styled.p``;
const CardsContainer = styled.div``;
const Card = styled.div<{ $variant?: string | null }>`
  border: 2px solid
    ${({ $variant }) => {
      if ($variant === "correct") {
        return "teal";
      } else if ($variant === "incorrect") {
        return "tomato";
      } else {
        return "darkgrey";
      }
    }};
  padding: 12px;
  margin-bottom: 16px;
`;
const NextButton = styled.button``;
