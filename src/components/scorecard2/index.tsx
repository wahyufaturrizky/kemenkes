import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Spin } from "@/components";
interface Scorecard2Props {
  title: string;
  subtitle?: string;
  pct?: string;
  value: string;
  className?: string;
  isLoading: boolean;
}
const Scorecard2: React.FC<Scorecard2Props> = ({
  title,
  subtitle,
  pct,
  value,
  className,
  isLoading,
}) => {
  return (
    <div
      className={`h-44 bg-primary grid grid-cols-2 p-5 text-white ${className} relative`}
    >
      {isLoading && (
        <div className="absolute w-full h-full flex justify-center items-center">
          <Spin />
        </div>
      )}
      <div className="flex flex-col justify-between">
        <p className="font-bold text-2xl">ANC</p>
        <p className="font-bold text-6xl">{title}</p>
        <p className="font-bold text-2xl">{subtitle}</p>
      </div>
      <div className="flex flex-col items-end">
        <IoMdInformationCircleOutline size={24} />
        <p className="font-bold text-3xl m-3">{value}</p>
        <p className="font-bold text-2xl">{pct}</p>
      </div>
    </div>
  );
};
export default Scorecard2;
