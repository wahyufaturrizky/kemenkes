import * as echarts from "echarts";
import { EChartsOptionProps } from "@/components/graph-echarts";

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
