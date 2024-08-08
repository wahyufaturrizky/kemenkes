"use client";
import { useEffect, useState } from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { Opts } from "echarts-for-react/lib/types";

export interface EChartsOptionProps extends EChartsOption {
  title?: object;
  tooltip?: object;
  visualMap?: object;
  toolbox?: object;
  series: object[];
}
interface MapEChartsProps {
  mapOptions: EChartsOptionProps;
  opts?: Opts;
}

const MapEChartsAnc: React.FC<MapEChartsProps> = ({ mapOptions, opts }) => {
  const [option, setOption] = useState<any>({});
  useEffect(() => {
    if (mapOptions.series) setOption(mapOptions);
  }, [mapOptions]);
  return (
    <ReactECharts option={option} opts={opts} style={{ height: "100%" }} />
  );
};

export default MapEChartsAnc;
