import React from "react";

type Props = {
  onClick: () => void;
};

const RandomButton = (props: Props) => {
  return (
    <div className="px-10 sm:w-full ">
      <button
        className="text-2xl text-neutral-600 py-2 px-4 border border-2 border-r-neutral-500 border-b-neutral-500 p-1 bg-yellow-200 md:absolute top-0 right-0 w-full md:w-auto md:m-10"
        onClick={props.onClick}
      >
        Random
      </button>
    </div>
  );
};

export default RandomButton;
