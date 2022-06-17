import React from "react";

type StartViewProps = {
  handleOptionClick: (isKnown: boolean) => void;
};
export function StartView({ handleOptionClick }: StartViewProps) {
  return (
    <div className="flex justify-around">
      <button className="w-1/3 text-center border-2 border-slate-600 rounded-md p-2">
        <p
          className="font-body font-light"
          onClick={() => handleOptionClick(true)}
        >
          I know it
        </p>
      </button>
      <button className=" w-1/3 text-center border-2 border-slate-600 rounded-md p-2">
        <p
          className="font-body font-light"
          onClick={() => handleOptionClick(false)}
        >
          I don't
        </p>
      </button>
    </div>
  );
}
