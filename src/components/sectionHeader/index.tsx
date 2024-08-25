import React from "react";
import { IoMdArrowForward, IoMdInformationCircleOutline } from "react-icons/io";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  btn?: string;
  onDataSubmit?: (data: boolean) => void;
  icon?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  btn,
  onDataSubmit,
  icon,
}) => {
  const handleClick = (value: boolean) => {
    if (onDataSubmit) {
      // Memeriksa apakah onDataSubmit ada sebelum memanggilnya
      onDataSubmit(value);
    }
  };
  return (
    <div className="w-full mt-10">
      <div className="flex justify-between">
        <div className="text-[#505581]">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-2">{title}</h1>
            {icon && <IoMdInformationCircleOutline size={20} color="#00B1A9" />}
          </div>
          <p className="font-medium">{subtitle}</p>
        </div>
        {btn && (
          <div
            className="bg-primary w-[181px] flex h-9 rounded-[50px] justify-center items-center px-2 whitespace-nowrap cursor-pointer"
            onClick={() => handleClick(true)}
          >
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
