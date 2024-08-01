import React from "react";
import { IoMdArrowForward } from "react-icons/io";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  btn?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  btn,
}) => {
  return (
    <div className="w-full mt-10">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl  text-[#424242] font-bold">{title}</h1>
          <p className="font-medium">{subtitle}</p>
        </div>
        {btn && (
          <div className="bg-primary w-[181px] flex h-9 rounded-[50px] justify-center items-center px-2 whitespace-nowrap cursor-pointer">
            <IoMdArrowForward size={25} color="white" />
            <p className="font-bold text-white pl-1">{btn}</p>
          </div>
        )}
      </div>
      <div className="h-[3px] w-[63%] flex">
        <div className="bg-primary h-full w-[66%]"></div>
        <div className="bg-secondary h-full w-[33%]"></div>
      </div>
    </div>
  );
};

export default SectionHeader;
