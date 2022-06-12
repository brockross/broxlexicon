import styled from "styled-components";

export const Card = styled.div<{ $variant: string }>`
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
