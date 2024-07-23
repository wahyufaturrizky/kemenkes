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
        formatter: "{value}%",
      },
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any, i: number) => {
          tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${formatNumber(item.value)}</strong></span><br/>`;
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
      show: true,
      axisLabel: {
        formatter: function (value: any) {
          return formatNumber(value || 0);
        }
      },
    },
    series: reversedSeries,
  };
  return option;
};
export const graphOptions2 = (series: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#8ECCFF", "#8ECCFF", "#00B1A9"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
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
        rotate: 90 //If the label names are too long you can manage this by rotating the label.
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
    color: ["#F85253", "#2E90FA"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any, i: number) => {
          tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${formatNumber(item.value)}%</strong></span><br/>`;
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
      axisLabel: {
        interval: 0,
        rotate: 90 //If the label names are too long you can manage this by rotating the label.
      }
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: series,
  };
  return option;
};
export const graphOptions4 = (series: any[], xData: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#84E0DB", "#57D0CB", "#2DB1A9", "#176B66"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any, i: number) => {
          tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${formatNumber(item.value)}%</strong></span><br/>`;
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
      axisLabel: {
        interval: 0,
        rotate: 90 //If the label names are too long you can manage this by rotating the label.
      }
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: '{value}%'
      }
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
      show: true
    },
    xAxis: {
      type: "category",
      data: legend,
      axisLabel: {
        interval: 0,
        rotate: 90 //If the label names are too long you can manage this by rotating the label.
      }
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value: any) => formatNumber(value)
      }
    },
    series: series,
  };
  return option;
};
export const graphOptions6 = (series: any[], xData: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#2E90FA"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any, i: number) => {
          tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${formatNumber(item.value)}</strong></span><br/>`;
        });
        tooltipContent += `</div>`;
        return tooltipContent;
      },
    },
    legend: {
      show: false,
      data: series.map((r) => r.name),
      bottom: 20,
      orient: "horizontal",
      x: "center",
    },
    xAxis: {
      type: "category",
      data: xData,
      axisLabel: {
        interval: 0,
        rotate: 90 //If the label names are too long you can manage this by rotating the label.
      }
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value: any) => formatNumber(value)
      }
    },
    series: series,
  };
  return option;
};

export const graphOptions7 = (series: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#669F2A"],
    grid: { containLabel: true },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let tooltipContent = `<div style="min-width: 350px;">${params[0].axisValueLabel}<br/>`;
        params.forEach((item: any, i: number) => {
          tooltipContent += `${item.marker} ${item.seriesName} <span style="float: right;"><strong>${formatNumber(item.value)}</strong></span><br/>`;
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
      show: false
    },
    xAxis: {
      type: "category",
      data: dataMonth?.map((r) => r.label),
      axisLabel: {
        interval: 0,
        rotate: 30 //If the label names are too long you can manage this by rotating the label.
      }
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value: any) => formatNumber(value)
      }
    },
    series: series,
  };
  return option;
};