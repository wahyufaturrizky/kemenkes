import { EChartsOptionProps } from "@/components/graph-echarts";

export const graphOptions1 = (series: any[], xdata: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#04DACF", "#BC2A3F"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      selectedMode: false,
      icon: "circle",
      bottom: -5,
    },
    grid: {
      left: "3%",
      right: "3%",
      top: 50,
      bottom: 200,
    },
    xAxis: [
      {
        type: "category",
        data: xdata.map((data: any) => data.region),
        axisLabel: {
          interval: 0,
          rotate: 90,
          orient: "horizontal",
          x: "center",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series,
  };

  return option;
};
export const graphOptions2 = (series: any[], xdata?: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#0087F4", "#CF3E53"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: 50,
      //   top: 50,
      containLabel: true,
    },
    legend: {
      selectedMode: false,
      icon: "circle",
      bottom: -5,
    },
    xAxis: [
      {
        type: "category",
        data: xdata,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series,
  };

  return option;
};
export const graphOptions3 = (series: any[], xdata?: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#0087F4", "#CF3E53"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: 50,
      //   top: 50,
      containLabel: true,
    },
    legend: {
      selectedMode: false,
      icon: "circle",
      bottom: -5,
    },
    xAxis: [
      {
        type: "category",
        data: xdata,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series,
  };

  return option;
};
