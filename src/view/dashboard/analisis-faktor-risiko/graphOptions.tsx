import { EChartsOptionProps } from "@/components/graph-echarts";
import { formatNumber } from "@/helpers";
import { dataProvinsi } from "@/view/dashboard/bayi-balita/graphOptions";

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

export const graphOptions4 = (series: any[], legend: any[]) => {
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
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any, index: number) => {
          if (item.seriesName === "Total Penerima") {
            // Menggunakan data asli untuk "Total Penerima" dalam tooltip
            const originalData = series.find((serie) => serie.name === "Total Penerima").data[
              legend.length - 1 - params[0].dataIndex
            ];
            tooltipContent += `${item.marker} ${
              item.seriesName
            } <span style="float: right;"><strong>${formatNumber(
              originalData
            )}</strong></span><br/>`;
          } else if (item.seriesName !== "Target") {
            // Ganti dengan nama series yang sesuai
            tooltipContent += `${item.marker} ${
              item.seriesName
            } <span style="float: right;"><strong>${formatNumber(
              item.value
            )}%</strong></span><br/>`;
          }
        });
        tooltipContent += `</div>`;
        return tooltipContent;
      },
      // formatter: function (params: any) {
      //   let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
      //   params.forEach((item: any, index: number) => {
      //     if (item.seriesName === "Total Penerima") {
      //       // Menggunakan data asli untuk "Total Penerima" dalam tooltip
      //       const originalData = series.find(
      //         (serie) => serie.name === "Total Penerima"
      //       ).data[legend.length - 1 - params[0].dataIndex];
      //       tooltipContent += `${item.marker} ${
      //         item.seriesName
      //       } <span style="float: right;"><strong>${formatNumber(
      //         originalData
      //       )}</strong></span><br/>`;
      //     } else {
      //       tooltipContent += `${item.marker} ${
      //         item.seriesName
      //       } <span style="float: right;"><strong>${formatNumber(
      //         item.value
      //       )}%</strong></span><br/>`;
      //     }
      //   });
      //   tooltipContent += `</div>`;
      //   return tooltipContent;
      // },
    },
    yAxis: {
      type: "category",
      data: reversedLegend,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: (value: any) => `${formatNumber(value)}%`,
      },
    },
    series: reversedSeries,
  };
  return option;
};

export const graphOptions7 = (series: any[]) => {
  const option: EChartsOptionProps = {
    legend: {
      selectedMode: false,
      icon: "circle",
      bottom: -5,
    },
    grid: {
      left: 100,
      right: 100,
      top: 50,
      bottom: 200,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value: number) => {
          return formatNumber(value);
        },
      },
    },
    xAxis: {
      type: "category",
      data: dataProvinsi.map((data: any) => data.label),
      axisLabel: {
        interval: 0,
        rotate: 90,
        orient: "horizontal",
        x: "center",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (params: any) => {
        let tooltipText = params[0].name + "<br/>";
        params.forEach((item: any) => {
          tooltipText += `${item.marker}${item.seriesName}: ${item.value}<br/>`;
        });
        return tooltipText;
      },
    },
    series,
  };

  return option;
};
