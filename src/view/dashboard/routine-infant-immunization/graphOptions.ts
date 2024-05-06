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
    grid: { containLabel: true },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: series.map((r) => r.name)
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
export const graphOptions3 = (series: any[], legend: any[]) => {
  const option: EChartsOptionProps = {
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
export const graphOptions4 = (series: any[], legend: any[]) => {
  const option: EChartsOptionProps = {
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