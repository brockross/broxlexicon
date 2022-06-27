import React from "react";

type DontKnowProps = {
  correctDefinition: string;
};
export function DontKnowView({ correctDefinition }: DontKnowProps) {
  return (
    <div className="block w-full rounded-md font-body font-light border-2 border-teal-500 mb-2 p-3 text-center">
      {correctDefinition}
    </div>
  );
}
