import { EChartsOptionProps } from "@/components/graph-echarts"
import { dataMonth } from "@/utils/constants"

export const graphOptions1 = (series: any[]) => {
  const option: EChartsOptionProps = {
    grid: { containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    yAxis: {
      type: 'category',
      data: series.map((r) => r.name)
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: series
  }
  return option
}
export const graphOptions2 = (series: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#EAAA08", "#8ECCFF", "#00B1A9"],
    grid: { containLabel: true },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: series.map((r) => r.name),
      bottom: 20,
      orient: 'horizontal',
      x: 'center'
    },
    xAxis: {
      type: 'category',
      data: dataMonth?.map((r) => r.label)
    },
    yAxis: {
      type: 'value'
    },
    series: series
  }
  return option
}
export const graphOptions3 = (series: any[], xData: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#EAAA08", "#FF4405", "#2E90FA"],
    grid: { containLabel: true },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      show: true,
      data: series.map((r) => r.name),
      bottom: 20,
      orient: 'horizontal',
      x: 'center'
    },
    xAxis: {
      type: 'category',
      data: xData
    },
    yAxis: {
      type: 'value'
    },
    series: series
  }
  return option
}
export const graphOptions4 = (series: any[], xData: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#83E0DB", "#00B1A9"],
    grid: { containLabel: true },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      show: true,
      data: series.map((r) => r.name),
      bottom: 20,
      orient: 'horizontal',
      x: 'center'
    },
    xAxis: {
      type: 'category',
      data: xData
    },
    yAxis: {
      type: 'value'
    },
    series: series
  }
  return option
}
export const graphOptions5 = (series: any[], legend: any[]) => {
  const option: EChartsOptionProps = {
    color: ["#2E90FA", "#E478FA"],
    grid: { containLabel: true },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: legend
    },
    xAxis: {
      type: 'category',
      data: legend
    },
    yAxis: {
      type: 'value'
    },
    series: series
  }
  return option
}