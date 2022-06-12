import { words } from "lodash";
import React, { useState } from "react";
import styled from "styled-components";

import { Card } from "../components";

type ChoicesViewProps = {
  definitions: string[];
  correctIdx: number;
  handleCardChoice: (isCorrect: boolean) => void;
};

export function ChoicesView({
  definitions,
  correctIdx,
  handleCardChoice,
}: ChoicesViewProps) {
  // I'm thinking this component should be smart--managing the responsibility for whether a card has been clicked,
  // styles for correct/incorrect, etc. Main state in parent doesn't need to care about the management of the cards;
  // it just needs to know A) what to do with scoring, and B) what view to show next

  const [hasMadeSelection, setHasMadeSelection] = useState(false);
  const [clickedCardIdx, setClickedCardIdx] = useState<null | number>(null);

  const handleCardClick = (cardIdx: number) => {
    if (hasMadeSelection) {
      return;
    }
    setClickedCardIdx(cardIdx);
    handleCardChoice(cardIdx === correctIdx);
    setHasMadeSelection(true);
  };

  const getCardVariant = (
    cardIdx: number,
    clickedIdx: number | null,
    correctIdx: number
  ) => {
    if (!hasMadeSelection) {
      return "unclicked";
    }

    if (correctIdx === cardIdx) {
      return "correct";
    }
    if (clickedIdx === cardIdx && cardIdx !== correctIdx) {
      return "incorrect";
    }
    return "unclicked";
  };

  return (
    <Container>
      {definitions.map((def, idx) => {
        return (
          <Card
            $variant={getCardVariant(idx, clickedCardIdx, correctIdx)}
            onClick={() => handleCardClick(idx)}
          >
            {def}
          </Card>
        );
      })}
    </Container>
  );
}

const Container = styled.div``;
