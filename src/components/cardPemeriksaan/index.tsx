import React from "react";
import Progress from "../progress";
import { formatNumber } from "@/helpers";

interface card {
  label: string;
  value: number;
  pct: string;
  //   styles: string;
  //   isLoading?: boolean;
  textBlue?: boolean;
  data: any;
}

const CardPemeriksaan: React.FC<card> = ({
  label,
  value,
  pct,
  data,
  //   styles,
  textBlue,
}) => {
  return (
    <div className="col-span-6 lg:col-span-4 rounded-2xl max-h-[800px] min-h-[420px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-[34px] flex flex-col justify-between">
      <div>
        <p className="font-semibold text-xl">{label}</p>
        <div className="flex items-baseline">
          <p className="text-[#006A65] font-semibold text-[32px] mt-8  mb-[14px]">
            {formatNumber(value)}
          </p>
          <p className="text-[#616161] font-normal text-base ml-[10px]">
            Peserta
          </p>
        </div>
        <p className="text-[#616161] font-normal text-sm">
          <span
            style={{
              color: textBlue ? "#00B3AC" : "",
              fontWeight: textBlue ? "bold" : "normal",
            }}
          >
            {pct}%
          </span>{" "}
          dari jumlah sasaran{" "}
          {textBlue ? (
            <span
              style={{
                color: textBlue ? "#00B3AC" : "",
                fontWeight: textBlue ? "bold" : "normal",
              }}
            >
              remaja putri
            </span>
          ) : (
            "remaja"
          )}
        </p>
        <div className="w-full mb-4 mt-5">
          {data?.map((data: any, i: number) => (
            <div className="grid grid-cols-2 w-full mb-1" key={i}>
              <div className="col-span-1 flex items-center">
                <div
                  className="h-[10px] w-[4px] mr-1"
                  style={{ background: `${data.color}` }}
                ></div>
                <p className="font-normal text-sm">{data.label}</p>
              </div>
              <div className="col-span-1">
                <div className="w-full grid grid-cols-2">
                  <div className="col-span-1 text-right font-semibold text-sm">
                    {formatNumber(data.value)}
                  </div>
                  <div className="col-span-1 text-right text-[#616161] text-sm font-normal">
                    ({formatNumber(data.percentage)}%)
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Progress data={data} />
    </div>
  );
};

export default CardPemeriksaan;
