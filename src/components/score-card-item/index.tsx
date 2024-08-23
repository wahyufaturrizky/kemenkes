import React from "react";
import Spin from "../spin";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface ScoreCardItemProps {
  title: string;
  total: string;
  percentage: string;
  isLoading: boolean;
  className?: string;
  showPercent?: boolean;
  onClick?: () => void;
}

const ScoreCardItem: React.FC<ScoreCardItemProps> = ({
  title,
  total,
  percentage,
  isLoading,
  className,
  onClick,
  showPercent,
}) => {
  return (
    <div
      className={`h-44 bg-primary px-5 py-[10px] flex flex-col justify-between text-white relative ${className}`}
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute w-full h-full flex justify-center items-center">
          <Spin />
        </div>
      )}
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{title}</h1>
        <IoMdInformationCircleOutline size={24} />
      </div>
      <div className="flex justify-between">
        <p className="text-3xl font-bold">{total}</p>
        {showPercent && <p className="text-2xl font-semibold">{percentage}%</p>}
      </div>
    </div>
  );
};

export default ScoreCardItem;
