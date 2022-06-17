import React from "react";

type StartViewProps = {
  handleOptionClick: (isKnown: boolean) => void;
};
export function StartView({ handleOptionClick }: StartViewProps) {
  return (
    <div>
      <p onClick={() => handleOptionClick(true)}>I know it</p>
      <p onClick={() => handleOptionClick(false)}>I don't</p>
    </div>
  );
}
