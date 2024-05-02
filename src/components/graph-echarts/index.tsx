'use client'

import { useEffect, useState } from "react";
import ReactECharts, { EChartsOption } from 'echarts-for-react';

export interface EChartsOptionProps extends EChartsOption {
  title?: object
  tooltip?: object
  legend?: object
  xAxis: object
  yAxis: object
  series: object[]
}
interface GraphEChartsProps {
  graphOptions: EChartsOptionProps
}

const GraphECharts: React.FC<GraphEChartsProps> = ({ graphOptions }) => {
  const [option, setOption] = useState<any>({});
  useEffect(() => {
    if (graphOptions.series)
      setOption(graphOptions)
  }, [graphOptions])
  return <ReactECharts option={option} />;
};

export default GraphECharts;