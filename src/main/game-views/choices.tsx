import { words } from "lodash";
import React, { useState } from "react";
import styled from "styled-components";

import { Card } from "../components";

type ChoicesViewProps = {
  definitions: string[];
};

export function ChoicesView({ definitions }: ChoicesViewProps) {
  // I'm thinking this component should be smart--managing the responsibility for whether a card has been clicked,
  // styles for correct/incorrect, etc. Main state in parent doesn't need to care about the management of the cards;
  // it just needs to know A) what to do with scoring, and B) what view to show next

  const [hasMadeSelection, setHasMadeSelection] = useState(false);

  return (
    <Container>
      {definitions.map((def) => {
        return <Card>{def}</Card>;
      })}
    </Container>
  );
}

const Container = styled.div``;
