import React from "react";

type StartViewProps = {
  handleOptionClick: (isKnown: boolean) => void;
};
export function StartView({ handleOptionClick }: StartViewProps) {
  return (
    <div className="flex justify-around">
      <button className=" w-1/3 text-center border-2 border-stone-600 rounded-md p-2 text-stone-600">
        <p
          className="font-body font-light  hover:font-medium"
          onClick={() => handleOptionClick(false)}
        >
          don't know it
        </p>
      </button>
      <button className="w-1/3 text-center border-2 border-stone-500 rounded-md p-2 bg-stone-500 text-stone-200">
        <p
          className="font-body font-light hover:font-medium"
          onClick={() => handleOptionClick(true)}
        >
          know it
        </p>
      </button>
    </div>
  );
}
