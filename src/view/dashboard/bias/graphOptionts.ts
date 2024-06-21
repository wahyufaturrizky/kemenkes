import { EChartsOptionProps } from "@/components/graph-echarts";
import { dataMonth } from "@/utils/constants";
import { formatNumber } from "@/helpers";

// export const graphOptions3 = (series: any[], xData: any[]) => {
//   const option: EChartsOptionProps = {
//     color: ["#8ECCFF", "#00B1A9", "#EAAA08"],
//     grid: { containLabel: true },
//     tooltip: {
//       trigger: "axis",
//     },
//     legend: {
//       show: true,
//       data: series.map((r) => r.name),
//       bottom: 20,
//       orient: "horizontal",
//       x: "center",
//     },
//     xAxis: {
//       type: "category",
//       data: xData,
//     },
//     yAxis: {
//       type: "value",
//     },
//     series: series,
//   };
//   return option;
// };
export const graphOptions3 = (series: any[], legend: any[]) => {
  const upperCaseLegend = legend.map((item) => item.toUpperCase());
  const option: EChartsOptionProps = {
    color: ["#00B1A9", "#8ECCFF", "#EAAA08"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any) => {
          if (item.seriesName === "Cakupan") {
            tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${item.value}</strong></span><br/>`;
          } else {
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
    },
    legend: {
      show: true,
      data: series.map((r) => r.name),
      bottom: 20,
      orient: "horizontal",
      x: "center",
      // formatter: function (name: string) {
      //   return name.toUpperCase();
      // },
    },
    xAxis: {
      type: "category",
      data: upperCaseLegend,
    },
    yAxis: [
      {
        type: "value",
        // name: "Cakupan",
        position: "left",
        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        type: "value",
        // name: "% Target Cakupan",
        position: "right",
        axisLabel: {
          formatter: "{value} %",
        },
        min: 0,
        max: 100,
        // Menyembunyikan sumbu y kedua
      },
    ],
    series: series.map((s) => {
      if (s.name === "Cakupan") {
        return {
          ...s,
          yAxisIndex: 0, // Menggunakan sumbu y pertama untuk "Cakupan"
        };
      }
      return {
        ...s,
        yAxisIndex: 1, // Menggunakan sumbu y kedua untuk persentase
      };
    }),
  };
  return option;
};

export const graphOptions4 = (series: any[], xData: any[]) => {
  const filteredSeries = series?.filter((s) => s.name !== "Total");
  const upperCaseLegend = xData?.map((item) => item.toUpperCase());

  const option: EChartsOptionProps = {
    color: ["#00B1A9", "#FAC515"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any) => {
          if (item.seriesName === "Total") {
            // Menggunakan data asli untuk "Total" dalam tooltip
            const originalData = series.find((serie) => serie.name === "Total")
              .data[params[0].dataIndex];
            tooltipContent += `${item.marker} ${
              item.seriesName
            } <span style="float: right;"><strong>${formatNumber(
              originalData
            )}</strong></span><br/>`;
          } else if (item.seriesName === "Cakupan") {
            // Menggunakan format untuk "Cakupan"
            tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${item.value}</strong></span><br/>`;
          } else {
            // Menggunakan format persentase untuk lainnya
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
    },
    legend: {
      show: true,
      data: filteredSeries.map((r) => r.name),
      bottom: 20,
      orient: "horizontal",
      x: "center",
    },
    xAxis: {
      type: "category",
      data: upperCaseLegend,
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
export const graphOptions5 = (series: any[], legend: any[]) => {
  const upperCaseLegend = legend?.map((item) => item.toUpperCase());

  const option: EChartsOptionProps = {
    color: ["#2E90FA", "#E478FA"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any) => {
          if (item.seriesName === "Total") {
            const originalData = series.find((serie) => serie.name === "Total")
              .data[params[0].dataIndex];
            console.log(
              "Original Data at index ",
              params[0].dataIndex,
              ": ",
              originalData
            );
            tooltipContent += `${item.marker} ${
              item.seriesName
            } <span style="float: right;"><strong>${formatNumber(
              originalData
            )}</strong></span><br/>`;
          } else if (item.seriesName === "Cakupan") {
            tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${item.value}</strong></span><br/>`;
          } else {
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
    },
    legend: {
      data: legend,
    },
    xAxis: {
      type: "category",
      data: upperCaseLegend,
    },
    yAxis: {
      type: "value",
    },
    series: series,
  };
  return option;
};
