import { EChartsOptionProps } from "@/components/graph-echarts";
import { dataMonth } from "@/utils/constants";
import { formatNumber } from "@/helpers";

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
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any, index: number) => {
          if (item.seriesName === "Total Penerima") {
            // Menggunakan data asli untuk "Total Penerima" dalam tooltip
            const originalData = series.find(
              (serie) => serie.name === "Total Penerima"
            ).data[legend.length - 1 - params[0].dataIndex];
            tooltipContent += `${item.marker} ${item.seriesName
              } <span style="float: right;"><strong>${formatNumber(
                originalData
              )}</strong></span><br/>`;
          } else if (item.seriesName !== "Target") {
            // Ganti dengan nama series yang sesuai
            tooltipContent += `${item.marker} ${item.seriesName
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
        formatter: (value: any) => `${formatNumber(value)}%`
      },
    },
    series: reversedSeries,
  };
  return option;
};

export const graphOptions2 = (series: any[], showYAxis?: boolean) => {
  const option: EChartsOptionProps = {
    color: ["#00B1A9", "#EAAA08", "#8ECCFF"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        const additionalDataSeries = series.find(
          (s: any) => s.name === "% Cakupan"
        ); // Ganti "Nama Series Anda" dengan nama yang tepat
        params.forEach((item: any, i: number) => {
          if (item.seriesName === "Jumlah Penerima Imunisasi") {
            tooltipContent += `${item.marker} ${item.seriesName
              } <span style="float: right;"><strong>${formatNumber(
                item.value
              )}</strong></span><br/>`;
          } else {
            const additionalDataValue = additionalDataSeries
              ? additionalDataSeries.additionalData[item.dataIndex]
              : 0;
            tooltipContent += `${item.marker} ${item.seriesName
              } <span style="float: right;"><strong>${formatNumber(
                additionalDataValue
              )}%</strong></span><br/>`;
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
        rotate: 90, // Kurangi rotasi label sumbu X agar lebih terbaca
        interval: 0, // Atur interval label sumbu X (0 menampilkan semua label)
        // align: "right",
        // verticalAlign: "middle",
      },
    },
    yAxis: {
      type: "value",
      show: showYAxis ?? false,
    },
    series: series,
  };
  return option;
};

export const graphOptions3 = (series: any[], xData: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#00B1A9", "#EAAA08", "#8CEEFF"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        const additionalDataSeries = series.find(
          (s: any) => s.name === "% Cakupan"
        ); // Ganti "Nama Series Anda" dengan nama yang tepat
        params.forEach((item: any, i: number) => {
          if (item.seriesName === "Cakupan") {
            tooltipContent += `${item.marker} ${item.seriesName
              } <span style="float: right;"><strong>${formatNumber(
                item.value
              )}</strong></span><br/>`;
          } else {
            const additionalDataValue = additionalDataSeries
              ? additionalDataSeries.additionalData[item.dataIndex]
              : 0;
            tooltipContent += `${item.marker} ${item.seriesName
              } <span style="float: right;"><strong>${formatNumber(
                additionalDataValue
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
      axisPointer: {
        type: "shadow", // atau 'line', tergantung kebutuhan
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
    },
    series: series,
  };
  return option;
};
export const graphOptions5 = (series: any[], xData: any[]) => {
  const filteredSeries = series?.filter((s) => s.name !== "Total");
  const upperCaseLegend = (xData || [])?.map((item) => item.toUpperCase());

  const option: EChartsOptionProps = {
    color: ["#2E90FA", "#E478FA"],
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
            tooltipContent += `${item.marker} ${item.seriesName
              } <span style="float: right;"><strong>${formatNumber(
                originalData
              )}</strong></span><br/>`;
          } else if (item.seriesName === "Cakupan") {
            // Menggunakan format untuk "Cakupan"
            tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${item.value}</strong></span><br/>`;
          } else {
            // Menggunakan format persentase untuk lainnya
            tooltipContent += `${item.marker} ${item.seriesName
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
        formatter: (value: any) => `${formatNumber(value)}%`
      },
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
