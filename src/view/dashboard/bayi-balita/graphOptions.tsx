import { EChartsOptionProps } from "@/components/graph-echarts";
import { formatNumber } from "@/helpers";
import { dataMonth } from "@/utils/constants";

export const dataProvinsi = [
  { label: "Aceh", value: "AC" },
  { label: "Sumatera Utara", value: "SU" },
  { label: "Sumatera Barat", value: "SB" },
  { label: "Riau", value: "RI" },
  { label: "Jambi", value: "JA" },
  { label: "Sumatera Selatan", value: "SS" },
  { label: "Bengkulu", value: "BE" },
  { label: "Lampung", value: "LA" },
  { label: "Kepulauan Bangka Belitung", value: "BB" },
  { label: "Kepulauan Riau", value: "KR" },
  { label: "DKI Jakarta", value: "JK" },
  { label: "Jawa Barat", value: "JB" },
  { label: "Jawa Tengah", value: "JT" },
  { label: "DI Yogyakarta", value: "YO" },
  { label: "Jawa Timur", value: "JI" },
  { label: "Banten", value: "BT" },
  { label: "Bali", value: "BA" },
  { label: "Nusa Tenggara Barat", value: "NB" },
  { label: "Nusa Tenggara Timur", value: "NT" },
  { label: "Kalimantan Barat", value: "KB" },
  { label: "Kalimantan Tengah", value: "KT" },
  { label: "Kalimantan Selatan", value: "KS" },
  { label: "Kalimantan Timur", value: "KI" },
  { label: "Kalimantan Utara", value: "KU" },
  { label: "Sulawesi Utara", value: "SA" },
  { label: "Sulawesi Tengah", value: "ST" },
  { label: "Sulawesi Selatan", value: "SN" },
  { label: "Sulawesi Tenggara", value: "SG" },
  { label: "Gorontalo", value: "GO" },
  { label: "Sulawesi Barat", value: "SR" },
  { label: "Maluku", value: "MA" },
  { label: "Maluku Utara", value: "MU" },
  { label: "Papua Barat", value: "PB" },
  { label: "Papua", value: "PA" },
  { label: "Papua Selatan", value: "PS" },
  { label: "Papua Tengah", value: "PT" },
  { label: "Papua Pegunungan", value: "PP" },
];

export const graphOptions1 = (series: any[]) => {
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
      bottom: 50,
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
      data: dataMonth.map((data: any) => data.label.slice(0, 3)),
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
export const graphOptions2 = (series: any[]) => {
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
