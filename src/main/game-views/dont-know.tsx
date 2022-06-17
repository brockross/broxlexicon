import React from "react";

type DontKnowProps = {
  correctDefinition: string;
};
export function DontKnowView({ correctDefinition }: DontKnowProps) {
  return <div style={{ border: "2px solid purple" }}>{correctDefinition}</div>;
}
