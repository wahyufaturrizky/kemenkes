import React from "react";

interface Scorecard1Props {
  title: string;
  total: string;
  pct?: string;
  direction: string;
}

const Scorecard1: React.FC<Scorecard1Props> = ({
  title,
  total,
  pct,
  direction,
}) => {
  return (
    <div
      className={`h-44 bg-primary rounded-${direction}-xl px-5 py-[10px] flex flex-col justify-between text-white`}
    >
      <h1 className="font-bold text-4xl">{title}</h1>
      <div className="flex justify-between items-end">
        <p className="text-5xl font-bold">{total}</p>
        <p className="font-bold text-xl">{pct}</p>
      </div>
    </div>
  );
};

export default Scorecard1;
