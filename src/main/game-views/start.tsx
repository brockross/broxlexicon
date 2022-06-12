import React from "react";
import styled from "styled-components";

type StartViewProps = {
  handleOptionClick: (isKnown: boolean) => void;
};
export function StartView({ handleOptionClick }: StartViewProps) {
  return (
    <Container>
      <p onClick={() => handleOptionClick(true)}>I know it</p>
      <p onClick={() => handleOptionClick(false)}>I don't</p>
    </Container>
  );
}

const Container = styled.div``;
