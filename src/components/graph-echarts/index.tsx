"use client";

import { useEffect, useState } from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { Opts } from "echarts-for-react/lib/types";

export interface EChartsOptionProps extends EChartsOption {
  title?: object;
  tooltip?: object;
  legend?: object;
  xAxis: object;
  yAxis: object;
  series: object[];
}
interface GraphEChartsProps {
  graphOptions: EChartsOptionProps;
  opts?: Opts;
  showLoading?: boolean;
}

const GraphECharts: React.FC<GraphEChartsProps> = ({ graphOptions, opts, showLoading }) => {
  const [option, setOption] = useState<any>({});
  useEffect(() => {
    if (graphOptions.series) setOption(graphOptions);
  }, [graphOptions]);

  return (
    <ReactECharts
      showLoading={showLoading}
      option={option}
      opts={opts}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default GraphECharts;
