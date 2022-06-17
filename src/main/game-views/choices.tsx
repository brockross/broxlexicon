import React, { useState } from "react";

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
  // it just needs to know what to do with the score

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
    <div>
      {definitions.map((def, idx) => {
        const variant = getCardVariant(idx, clickedCardIdx, correctIdx);
        return (
          <button
            className={`block w-full rounded-md font-body font-light border-2 border-stone-600 mb-2 p-3 ${
              variant === "correct" ? "border-teal-500" : ""
            } ${variant === "incorrect" ? "border-orange-600" : ""} ${
              variant === "unclicked" ? "border-stone-600" : ""
            }`}
            onClick={() => handleCardClick(idx)}
          >
            {def}
          </button>
        );
      })}
    </div>
  );
}
