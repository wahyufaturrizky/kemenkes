import { GraphEcharts } from "@/components";
import { BoxChartType } from "@/view/dashboard/analisis-diagnosa-ptm/type";
import { graphOptionsBoxChart } from "@/view/dashboard/analisis-diagnosa-ptm/util";

export const BoxChart = ({
  title,
  subTitle,
  amount,
  note1,
  note2,
  dataChart,
  showLoading,
}: BoxChartType) => {
  return (
    <div className="w-full p-4 mt-6 gap-3 flex flex-col shadow-[0px_1px_8px_0px_#0000000D] rounded-2xl pb-14 h-[750px]">
      {title && (
        <p className="font-plus-jakarta-sans text-[18px] font-semibold leading-[22.68px] text-left">
          {title}
        </p>
      )}

      {subTitle && (
        <p className="font-plus-jakarta-sans text-[14px] text-[#616161] font-medium leading-[17.64px] text-left">
          {subTitle}
        </p>
      )}

      {amount && (
        <p className="font-plus-jakarta-sans text-[#006A65] text-[32px] font-semibold leading-[32px] text-left">
          {amount}
        </p>
      )}

      {note1 && (
        <p className="font-plus-jakarta-sans text-[#616161] text-[14px] font-normal leading-[20px] text-left">
          {note1}
        </p>
      )}

      {note2 && (
        <p className="font-plus-jakarta-sans text-[#007AFF] text-[14px] font-normal leading-[20px] text-left">
          {note2}
        </p>
      )}

      <GraphEcharts
        showLoading={showLoading}
        graphOptions={graphOptionsBoxChart(dataChart)}
        opts={{
          height: 500,
        }}
      />
    </div>
  );
};
