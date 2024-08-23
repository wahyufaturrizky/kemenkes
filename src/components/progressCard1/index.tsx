import React from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import Progress from "../progress";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { formatNumber } from "@/helpers";
interface ProgressCardProps {
  title: string;
  sub?: string;
  total: number;
  pct: number;
  pct2: number;
  data: any;
  //   direction: string;
  //   isLoading: boolean;
}
const ProgressCard1: React.FC<ProgressCardProps> = ({
  title,
  sub,
  total,
  pct,
  pct2,
  data,
  //   direction,
  //   isLoading,
}) => {
  return (
    <div className="rounded-2xl border border-[#D6D6D6] col-span-6 py-6 px-8 flex flex-col justify-between relative">
      <div className="absolute top-6 right-8">
        <IoMdInformationCircleOutline size={24} color="#00B1A9" />
      </div>
      <div className="text-[#505581] font-bold">
        <p className="text-2xl">{title}</p>
        <p className="text-sm">{sub}</p>
      </div>
      <div>
        <p className="font-bold text-5xl text-[#BC2A3F]">
          {formatNumber(total)}
        </p>
        <p className="text-[#505581] font-normal text-lg">
          <span className="font-bold">{pct}%</span> dari jumlah sasaran
        </p>
        <div className="text-[#505581] font-normal text-lg relative">
          <MdKeyboardDoubleArrowUp
            className="text-[#34C759] absolute top-0 left-0"
            size={15}
          />
          <span className="font-bold ml-3">{pct2}%</span> dari bulan sebelumnya
        </div>
        <Progress data={data} styles="mt-9" />
      </div>
    </div>
  );
};

export default ProgressCard1;
