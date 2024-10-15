import { EChartsOptionProps } from "@/components/graph-echarts";
import { formatDateChart } from "@/lib/utils";
import { TotalParticipantBasedOnTimeType } from "@/view/dashboard/monitoring-faktor-risiko/type";

export const formatChartTotalParticipant = ({
  total_participant_based_on_time,
}: {
  total_participant_based_on_time?: TotalParticipantBasedOnTimeType[];
}) => {
  const option: EChartsOptionProps = {
    color: ["#00B3AC"],
    xAxis: {
      type: "category",
      data: formatDateChart(total_participant_based_on_time || []),
      axisLabel: {
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: total_participant_based_on_time?.map(
          (data: TotalParticipantBasedOnTimeType) => data.total
        ),
        type: "bar",
      },
    ],
  };
  return option;
};
