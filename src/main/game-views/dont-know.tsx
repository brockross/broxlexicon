import React from "react";
import styled from "styled-components";

import { Card } from "../components";

type DontKnowProps = {
  correctDefinition: string;
};
export function DontKnowView({ correctDefinition }: DontKnowProps) {
  return <Container>{correctDefinition}</Container>;
}

const Container = styled.div`
  border: 2px solid purple;
`;
