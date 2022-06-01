import React, { useState, useRef } from "react";
import styled from "styled-components";

import { getWordBank } from "../utils";

export function Main() {
  // put wordBank in a ref so we don't re-randomize the list on every render
  const wordBank = useRef(getWordBank());

  // keep track of current position in wordBank
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentWord = wordBank.current[currentIdx];

  console.log(
    `%c ***debug | index.tsx > main`,
    "background-color: #12908E; color: #f7f7f7; border-radius: 5px; padding: 1em;"
  );
  console.log({ currentWord });

  const [hasMadeSelection, setHasMadeSelection] = useState(false);
  const handleNextClick = () => {
    setClickedIdx(null);
    setHasMadeSelection(false);
    setCurrentIdx(currentIdx + 1);
  };

  const [clickedIdx, setClickedIdx] = useState<null | number>(null);
  const handleCardClick = (idx: number) => () => {
    if (hasMadeSelection) {
      return;
    }
    setHasMadeSelection(true);
    setClickedIdx(idx);
  };

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
        {currentWord.definitions.map((def, idx) => {
          return (
            <Card
              onClick={handleCardClick(idx)}
              $variant={getCardVariant(idx, clickedIdx, currentWord.correctIdx)}
              key={`${def}-${idx}`}
            >
              {def}
            </Card>
          );
        })}
      </CardsContainer>
      <NextButton disabled={!hasMadeSelection} onClick={handleNextClick}>
        {">>"}
      </NextButton>
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
