import { EChartsOptionProps } from "@/components/graph-echarts";
import { dataMonth } from "@/utils/constants";

export const graphOptions3 = (series: any[], xData: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#8ECCFF", "#00B1A9", "#EAAA08"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      show: true,
      data: series.map((r) => r.name),
      bottom: 20,
      orient: "horizontal",
      x: "center",
    },
    xAxis: {
      type: "category",
      data: xData,
    },
    yAxis: {
      type: "value",
    },
    series: series,
  };
  return option;
};

export const graphOptions4 = (series: any[], xData: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#00B1A9", "#FAC515"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let result = params[0].name + "<br/>";
        params.forEach(function (item: any) {
          result += item.seriesName + ": " + item.data + "%" + "<br/>";
        });
        return result;
      },
    },
    legend: {
      show: true,
      data: series.map((r) => r.name),
      bottom: 20,
      orient: "horizontal",
      x: "center",
    },
    xAxis: {
      type: "category",
      data: xData,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} %",
      },
    },
    series: series,
  };
  return option;
};
