import { EChartsOptionProps } from "@/components/graph-echarts";
import { formatNumber } from "@/helpers";
import { dataMonth } from "@/utils/constants";

export const graphOptions1 = (series: any[], legend: any[]) => {
  const reversedLegend = legend.slice().reverse();

  // Membalik urutan series agar sesuai dengan urutan legend yang dibalik
  const reversedSeries = series.map((serie) => {
    if (serie.name === "Total Penerima") {
      // Mengatur data ke 0 untuk "Total Penerima"
      return {
        ...serie,
        data: serie.data.map(() => 0),
      };
    }
    return {
      ...serie,
      data: serie.data.slice().reverse(),
    };
  });
  const option: EChartsOptionProps = {
    color: ["#00B1A9"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
      axisLabel: {
        formatter: (value: any) => `${formatNumber(value)}%`
      },
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any, i: number) => {
          tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${formatNumber(item.value)}%</strong></span><br/>`;
        });
        tooltipContent += `</div>`;
        return tooltipContent;
      },
    },
    yAxis: {
      type: "category",
      data: reversedLegend,
      axisLine: {
        onZero: false,
      },
      offset: 8,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: (value: any) => `${formatNumber(value)}%`
      },
    },
    series: reversedSeries,
  };
  return option;
};
export const graphOptions2 = (series: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#EAAA08", "#8ECCFF", "#00B1A9"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any, i: number) => {
          if (item.seriesName === "Jumlah Penerima Imunisasi") {
            tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${formatNumber(item.value)}</strong></span><br/>`;
          } else if (item.seriesName === "% Cakupan") {
            tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${formatNumber(Number(((item.value / params[0].data) * 100).toFixed(2)))}%</strong></span><br/>`;
          }
        });
        tooltipContent += `</div>`;
        return tooltipContent;
      },
    },
    legend: {
      data: series.map((r) => r.name),
      bottom: 20,
      orient: "horizontal",
      x: "center",
    },
    xAxis: {
      type: "category",
      data: dataMonth?.map((r) => r.label),
      axisLabel: {
        interval: 0,
        rotate: 30
      }
    },
    yAxis: {
      type: "value",
    },
    series: series,
  };
  return option;
};
export const graphOptions3 = (series: any[], xData: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#EAAA08", "#FF4405", "#2E90FA"],
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
    color: ["#83E0DB", "#00B1A9"],
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
export const graphOptions5 = (series: any[], legend: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#2E90FA", "#E478FA"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: legend,
    },
    xAxis: {
      type: "category",
      data: legend,
    },
    yAxis: {
      type: "value",
    },
    series: series,
  };
  return option;
};
export const graphOptions6 = (series: any[]) => {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        var tar = params[0];
        var tar2 = params[1];
        return (
          tar.name +
          "<br/>" +
          tar.seriesName +
          " : " +
          tar.value +
          "<br/>" +
          tar2.seriesName +
          " : " +
          tar2.value
        );
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      splitLine: { show: false },
      data: ["T1", "T2", "T3", "TT4", "T5", "T2+"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "WUS Tidak Hamil",
        type: "bar",
        stack: "Total",
        itemStyle: {
          borderColor: "#FAC515",
          color: "#FAC515",
        },
        emphasis: {
          itemStyle: {
            borderColor: "#FAC515",
            color: "#FAC515",
          },
        },
        label: {
          show: true,
          position: "inside",
        },
        data: [100, 1700, 1400, 1200, 300, 150],
      },
      {
        name: "WUS Hamil",
        type: "bar",
        stack: "Total",
        label: {
          show: true,
          position: "inside",
        },
        data: [2900, 1200, 300, 200, 900, 300],
      },
    ],
  };
  return option;
};
export const graphOptions7 = (series: any[]) => {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["T1", "T2", "T3", "T4", "T5", "T2+"],
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
    series: series,
  };
  return option;
};
