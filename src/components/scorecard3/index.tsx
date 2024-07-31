import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Spin } from "@/components";
interface Scorecard3Props {
  title: string;
  subtitle?: string;
  pct: string;
  value: string;
  color: string;
  status?: string;
  isLoading: boolean;
}
const Scorecard3: React.FC<Scorecard3Props> = ({
  title,
  subtitle,
  pct,
  value,
  color,
  status = "",
  isLoading,
}) => {
  const formatTeks = (text: string) => {
    return text?.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };
  return (
    <div className="h-44 text-[#505581]  flex flex-col justify-between py-5 pr-3 pl-[22px] rounded-xl border-t-8 border-r-8 border-[#00000080] relative">
      {isLoading && (
        <div className="absolute top-[38%] left-[45%]">
          <Spin />
        </div>
      )}
      <div>
        <div className="flex justify-between">
          <div className="flex items-end relative">
            <div
              className={`h-5 w-[10px] absolute top-0 -left-2`}
              style={{ background: color }}
            ></div>
            <p className="font-bold text-3xl">{title}</p>
            <p className="font-bold text-sm ml-1">{formatTeks(status)}</p>
          </div>
          <IoMdInformationCircleOutline size={24} color="#00B1A9" />
        </div>
        <p className="text-xs mt-1">{subtitle}</p>
      </div>
      <div className="flex justify-between items-end">
        <p className="font-bold text-3xl">{value}</p>
        <p className="font-bold">{pct}</p>
      </div>
    </div>
  );
};

export default Scorecard3;
