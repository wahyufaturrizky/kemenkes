"use client";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { Opts } from "echarts-for-react/lib/types";
import React from "react";
import { useEffect, useState } from "react";

export interface EChartsOptionProps extends EChartsOption {
  title?: object;
  tooltip?: object;
  legend?: object;
  xAxis: object;
  yAxis: object;
  series: object[];
}

interface GraphItemProps {
  graphOptions: EChartsOptionProps;
  opts?: Opts;
}

const GraphItem: React.FC<GraphItemProps> = ({ graphOptions, opts }) => {
  const [option, setOption] = useState<any>({});

  useEffect(() => {
    if (graphOptions.series) setOption(graphOptions);
  }, [graphOptions]);

  return (
    <ReactECharts option={option} opts={opts} style={{ height: "100%" }} />
  );
};

export default GraphItem;
