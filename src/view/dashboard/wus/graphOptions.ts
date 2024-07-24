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
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any, index: number) => {
          if (item.seriesName === "Total Penerima") {
            // Menggunakan data asli untuk "Total Penerima" dalam tooltip
            const originalData = series.find(
              (serie) => serie.name === "Total Penerima"
            ).data[legend.length - 1 - params[0].dataIndex];
            tooltipContent += `${item.marker} ${
              item.seriesName
            } <span style="float: right;"><strong>${formatNumber(
              originalData
            )}</strong></span><br/>`;
          } else if (item.seriesName !== "Target Cakupan per Daerah") {
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
    },

    yAxis: {
      type: "category",
      data: reversedLegend,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}%",
      },
    },
    series: reversedSeries,
    // width: "100%", // Misalnya, atur lebar grafik menjadi 100% dari container
    // height: "800px",
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
        params.forEach((item: any) => {
          if (item.seriesName === "Jumlah Penerima Imunisasi") {
            tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${item.value}</strong></span><br/>`;
          } else {
            tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${item.value}%</strong></span><br/>`;
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
      data: dataMonth?.map((r) => r.label),
    },
    yAxis: [
      {
        type: "value",
        position: "left",
        axisLabel: {
          formatter: "{value} %",
        },
        show: false,
      },
      {
        type: "value",
        name: "Jumlah Penerima Imunisasi",
        position: "right",
        show: false, // Menyembunyikan sumbu y kedua
      },
    ],
    series: series.map((s) => {
      if (s.name.includes("% Cakupan") || s.name.includes("% Target Cakupan")) {
        return {
          ...s,
          yAxisIndex: 0, // Menggunakan sumbu y pertama untuk persentase
        };
      }
      return {
        ...s,
        yAxisIndex: 1, // Tetap menggunakan sumbu y kedua (yang disembunyikan)
      };
    }),
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

export const graphOptions7 = (series: any[], xData: any[]) => {
  const option = {
    color: "#2E90FA",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      valueFormatter: function (value: any) {
        return new Intl.NumberFormat("id-ID").format(value);
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
        data: xData,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          formatter: function (value: any) {
            return formatNumber(value);
          },
        },
      },
    ],
    series: series.map((serie) => ({
      ...serie,
      label: {
        ...serie.label,
        formatter: function (params: any) {
          return formatNumber(params?.value);
        },
      },
    })),
  };
  return option;
};
export const graphOptions8 = (series: any[], xData: any[]) => {
  const option = {
    color: "#2E90FA",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      // valueFormatter: function (value: any) {
      //   return `${formatNumber(value)}%`;
      // },
      formatter: function (params: any) {
        // Define your status data array or object, replace this with your actual data
        const statusData = ["T1", "T2", "T3", "T4", "T5", "T2+", "Td"];

        // Start building the tooltip content
        let tooltipContent = `<div style="min-width: 350px;">
                              <strong>WUS Tidak Hamil</strong><br/>`;

        // Assuming params[0] is the data point we are interested in
        const dataIndex = params[0].dataIndex;
        const status = statusData[dataIndex]; // Get the status corresponding to the dataIndex

        // Add status line
        tooltipContent += `Status T: <span style="float: right;">${status}</span><br/>`;

        // Iterate over each item in params to build the rest of the tooltip
        params.forEach((item: any, index: number) => {
          if (item.seriesName === "Total Penerima") {
            const originalData = series.find(
              (serie) => serie.name === "Total Penerima"
            ).data[xData.length - 1 - params[0].dataIndex];
            tooltipContent += `${item.marker} ${
              item.seriesName
            } <span style="float: right;"><strong>${formatNumber(
              originalData
            )}</strong></span><br/>`;
          } else if (item.seriesName !== "Target Cakupan per Daerah") {
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
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    legend: {
      data: [
        ...series.map((serie) => serie.name),
        "WUS Hamil", // Tambahkan legend tambahan di sini
      ],
      icon: "circle", // Menggunakan bentuk lingkaran
      itemWidth: 8, // Ukuran lebar ikon
      itemHeight: 8,
    },
    xAxis: [
      {
        type: "category",
        data: xData,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          formatter: function (value: any) {
            return formatNumber(value);
          },
        },
      },
    ],
    series: series.map((serie) => ({
      ...serie,
      label: {
        ...serie.label,
        formatter: function (params: any) {
          return `${formatNumber(params?.value)}%`;
        },
      },
    })),
  };
  option.series.push({
    name: "WUS Hamil",
    type: "line", // atau 'bar', sesuai dengan jenis grafik Anda
    data: [], // Tidak ada data untuk seri tambahan ini
    color: "#2E90FA", // Warna biru untuk seri tambahan ini
    showSymbol: false, // Menyembunyikan simbol pada grafik
  });
  return option;
};
