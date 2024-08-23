import * as echarts from "echarts";
import { EChartsOptionProps } from "@/components/graph-echarts";
import { formatNumber } from "@/helpers";

export const graphOptions1 = (series: any[], legend: any[]) => {
  const reversedLegend = legend.slice().reverse();
  const reversedSeries = series.map((serie) => {
    // if (serie.name === "Total Penerima") {
    //   // Mengatur data ke 0 untuk "Total Penerima"
    //   return {
    //     ...serie,
    //     data: serie.data.map(() => 0),
    //   };
    // }
    return {
      ...serie,
      data: serie.data.slice().reverse(),
    };
  });

  const option: EChartsOptionProps = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      icon: "circle",
      bottom: -5,
      // textStyle: {
      //   fontWeight: "700", // Menjadikan teks legenda tebal
      // },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      axisLabel: {
        fontWeight: "700", // Menjadikan teks sumbu Y tebal
        // align: "left", // Rata kiri
        // margin: 15,
        formatter: (value: string) => {
          const words = value.split(" ");
          if (words.length > 2) {
            // Jika lebih dari dua kata, pisahkan menjadi tiga baris
            const lines = [];
            for (let i = 0; i < words.length; i += 2) {
              lines.push(words.slice(i, i + 2).join(" "));
            }
            return lines.join("\n");
          } else {
            return value;
          }
        },
      },
      data: reversedLegend,
    },
    series: reversedSeries,
    height: "500px",
  };

  return option;
};

export const graphOptions2 = (series: any[], xLabel: any[]) => {
  const option: EChartsOptionProps = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      icon: "circle",
      bottom: 0,
      data: ["Anemia", "Mendapatkan TTD", "Mengonsumsi TTD"],
    },
    // toolbox: {
    //   show: true,
    //   orient: "vertical",
    //   left: "right",
    //   top: "center",
    //   feature: {
    //     mark: { show: true },
    //     dataView: { show: true, readOnly: false },
    //     magicType: { show: true, type: ["line", "bar", "stack"] },
    //     restore: { show: true },
    //     saveAsImage: { show: true },
    //   },
    // },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: xLabel,
        axisLabel: {
          formatter: (value: string) => {
            const words = value.split(" ");
            if (words.length > 1) {
              // Jika lebih dari dua kata, pisahkan menjadi tiga baris
              const lines = [];
              for (let i = 0; i < words.length; i += 2) {
                lines.push(words.slice(i, i + 2).join(" "));
              }
              return lines.join("\n");
            } else {
              return value;
            }
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: series,
    dataZoom: [
      {
        type: "slider",
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 50,
        height: 5, // Adjust the height of the slider
        bottom: 30, // Adjust the position to not overlap with the legend
      },
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 50,
      },
    ],
  };

  return option;
};
export const graphOptions3 = (series: any[], label: any[]) => {
  const extendedLabel = [...label, ...Array(label.length).fill("")]; // Menambahkan kategori kosong di bagian kanan
  const extendedSeries = series.map((s) => ({
    ...s,
    data: [...s.data, ...Array(s.data.length).fill(0)], // Menambahkan data kosong di bagian kanan
    itemStyle: {
      color: (params: any) => {
        return params.dataIndex === 0 ? "#00968E" : "#00A2B3";
      },
    },
  }));
  const option: EChartsOptionProps = {
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
        data: extendedLabel,
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          // formatter: (value: any) => {
          //   const strValue = value.toString(); // Convert value to string
          //   const words = strValue.split(" ");
          //   if (words.length > 3) {
          //     // Jika lebih dari dua kata, pisahkan menjadi tiga baris
          //     const lines = [];
          //     for (let i = 0; i < words.length; i += 2) {
          //       lines.push(words.slice(i, i + 2).join(" "));
          //     }
          //     return lines.join("\n");
          //   } else {
          //     return value;
          //   }
          // },
          formatter: (value: any) => {
            const strValue = value.toString(); // Convert value to string
            const words = strValue.split(" ");
            const maxWordsPerLine = 3; // Maximum words per line
            const maxLines = 3; // Maximum lines

            // Calculate number of lines needed
            const linesNeeded = Math.ceil(words.length / maxWordsPerLine);
            if (linesNeeded <= 1) {
              return value; // Return single line if within limit
            }

            // Split into lines
            const lines = [];
            for (let i = 0; i < linesNeeded; i++) {
              const lineWords = words.slice(
                i * maxWordsPerLine,
                (i + 1) * maxWordsPerLine
              );
              lines.push(lineWords.join(" "));
            }

            return lines.join("\n");
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: extendedSeries,
  };

  return option;
};

export const graphOptions4 = (series: any[], legend: any[]) => {
  const upperCaseLegend = (legend || []).map((item) => item.toUpperCase());
  const option: EChartsOptionProps = {
    color: ["#00B1A9", "#BC2A3F"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any) => {
          if (item.seriesName === "Jumlah") {
            tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${item.value}</strong></span><br/>`;
          } else {
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
      data: series.map((r) => r.name),
      bottom: 20,
      orient: "horizontal",
      x: "center",
      icon: "circle",
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
          formatter: (params: any) => {
            return formatNumber(params);
          },
        },
      },
      {
        type: "value",
        // name: "% Target Cakupan",
        position: "right",
        axisLabel: {
          formatter: (value: any) => `${formatNumber(value)}`
        },
        min: 0,
        max: 100,
        // Menyembunyikan sumbu y kedua
      },
    ],
    series: series.map((s) => {
      if (s.name === "Jumlah") {
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
export const graphOptions5 = (series: any[], legend: any[]) => {
  const upperCaseLegend = (legend || []).map((item) => item.toUpperCase());
  const option: EChartsOptionProps = {
    color: ["#04DACF", "black", "#BC2A3F"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any) => {
          if (item.seriesName === "Jumlah Bumil Anemia") {
            tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${item.value}</strong></span><br/>`;
          } else {
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
      data: series.map((r) => r.name),
      bottom: 20,
      orient: "horizontal",
      x: "center",
      icon: "circle",
    },
    xAxis: {
      type: "category",
      data: upperCaseLegend,
      axisLabel: {
        rotate: 90, // Kurangi rotasi label sumbu X agar lebih terbaca
        // interval: 0, // Atur interval label sumbu X (0 menampilkan semua label)
        // align: "right",
        // verticalAlign: "middle",
      },
    },
    yAxis: [
      {
        type: "value",
        position: "left",
        axisLabel: {
          formatter: (params: any) => {
            return formatNumber(params);
          },
        },
      },
      {
        type: "value",
        // name: "% Target Cakupan",
        position: "right",
        axisLabel: {
          formatter: (value: any) => `${formatNumber(value)}%`
        },
        min: 0,
        max: 100,
        // Menyembunyikan sumbu y kedua
      },
    ],
    series: series.map((s) => {
      if (s.name === "Jumlah Bumil Anemia") {
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
export const graphOptions6 = (series: any[], yData: any[]) => {
  const reversedYdata = yData.slice().reverse();
  const reversedSeries = series.map((serie) => {
    return {
      ...serie,
      data: serie.data.slice().reverse(),
    };
  });
  const option: EChartsOptionProps = {
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any) => {
          tooltipContent += `${item.marker} ${item.seriesName
            } <span style="float: right;"><strong>${formatNumber(
              item.value
            )}%</strong></span><br/>`;
        });
        tooltipContent += `</div>`;
        return tooltipContent;
      },
    },
    legend: {
      icon: "circle",
      bottom: -5,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: (value: any) => `${formatNumber(value)}%`
      },
    },
    yAxis: {
      type: "category",
      axisLabel: {
        fontWeight: "700",
      },
      data: reversedYdata,
    },
    series: reversedSeries,
    height: "500px",
  };
  return option;
};

export const graphOptions7 = (series: any[], label: any[]) => {
  const extendedLabel = [...label, ...Array(label.length).fill("")]; // Menambahkan kategori kosong di bagian kanan
  const extendedSeries = series.map((s) => ({
    ...s,
    data: [...s.data, ...Array(s.data.length).fill(0)], // Menambahkan data kosong di bagian kanan
    itemStyle: {
      color: (params: any) => {
        return params.dataIndex === 0
          ? "#60D3AA"
          : params.dataIndex === 1
            ? "#00B3AC"
            : params.dataIndex === 2
              ? "#00968E"
              : "#00A2B3";
      },
      // #00B3AC
    },
  }));
  const option: EChartsOptionProps = {
    color: ["white", "#BC2A3F"],
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any) => {
          if (item.seriesName === "Sasaran") {
            tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${item.value}</strong></span><br/>`;
          } else {
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
      icon: "circle",
      bottom: -5,
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
        data: extendedLabel,
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          formatter: (value: any) => {
            const strValue = value.toString(); // Convert value to string
            const words = strValue.split(" ");
            const maxWordsPerLine = 3; // Maximum words per line
            const maxLines = 3; // Maximum lines

            // Calculate number of lines needed
            const linesNeeded = Math.ceil(words.length / maxWordsPerLine);
            if (linesNeeded <= 1) {
              return value; // Return single line if within limit
            }

            // Split into lines
            const lines = [];
            for (let i = 0; i < linesNeeded; i++) {
              const lineWords = words.slice(
                i * maxWordsPerLine,
                (i + 1) * maxWordsPerLine
              );
              lines.push(lineWords.join(" "));
            }

            return lines.join("\n");
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        position: "left",
        axisLabel: {
          formatter: (params: any) => {
            return formatNumber(params);
          },
        },
      },
      {
        type: "value",
        // name: "% Target Cakupan",
        position: "right",
        axisLabel: {
          formatter: (value: any) => `${formatNumber(value)}%`
        },
        min: 0,
        max: 100,
        // Menyembunyikan sumbu y kedua
      },
    ],
    series: extendedSeries,
  };

  return option;
};
