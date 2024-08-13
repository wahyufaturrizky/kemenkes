import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Spin } from "@/components";

interface Props {
  title: string;
  subtitle?: string;
  pct?: string;
  value: string;
  className?: string;
  isLoading: boolean;
}
const CardDetailSasaran: React.FC<Props> = ({
  title,
  subtitle,
  pct,
  value,
  className,
  isLoading,
}) => {
  return (
    <div className={className}>
      {isLoading && (
        <div className="absolute w-full h-full flex justify-center items-center">
          <Spin />
        </div>
      )}
      <div className="flex justify-between">
        <p className="font-semibold text-white">{title}</p>
        <IoMdInformationCircleOutline size={24} color="white" />
      </div>
      <p className="font-medium text-xs text-white">{subtitle}</p>
      <p className="font-bold text-xl text-white my-3">{value}</p>
      <p className="font-medium text-xs text-white">{pct} dari total</p>
      <p className="font-medium text-xs text-white">keseluruhan</p>
    </div>
  );
};

export default CardDetailSasaran;
