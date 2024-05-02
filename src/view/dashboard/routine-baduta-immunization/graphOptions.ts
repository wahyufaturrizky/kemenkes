import { EChartsOptionProps } from "@/components/graph-echarts"
import { dataMonth } from "@/utils/constants"

export const graphOptions1 = (series: any[]) => {
  const option: EChartsOptionProps = {
    grid: { containLabel: true },
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'category',
      data: series.map((r) => r.name)
    },
    xAxis: {
      type: 'value'
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
export const graphOptions3 = (series: any[]) => {
  const option: EChartsOptionProps = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: series.map((r) => r.name)
    },
    yAxis: {
      type: 'value'
    },
    series: series
  }
  return option
}