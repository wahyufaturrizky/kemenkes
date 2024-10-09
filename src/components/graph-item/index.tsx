"use client";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { Opts } from "echarts-for-react/lib/types";
import React, { useEffect, useState, useRef } from "react";

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
  isHideButtonDownload?: boolean;
}

const GraphItem: React.FC<GraphItemProps> = ({ graphOptions, opts, isHideButtonDownload }) => {
  const [option, setOption] = useState<any>({});
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (graphOptions.series) setOption(graphOptions);
  }, [graphOptions]);

  const downloadChart = () => {
    const chartInstance = chartRef.current?.getEchartsInstance();
    if (chartInstance) {
      // Increase the container size temporarily
      chartInstance.resize({
        width: 2000, // Adjust this for a larger export size
        height: 1200,
      });

      const imageURI = chartInstance.getDataURL({
        type: "png",
        pixelRatio: 3, // Increase this to avoid cutting off parts of the chart
        backgroundColor: "#fff", // Optional: Set a background color
      });

      // Create a download link
      const link = document.createElement("a");
      link.href = imageURI;
      link.download = "chart.png"; // Set the file name
      link.click();

      // Revert the chart size back to normal after exporting
      chartInstance.resize({
        width: null, // Set back to auto or original
        height: null,
      });
    }
  };

  return (
    <div style={{ height: "100%" }}>
      {!isHideButtonDownload && (
        <button
          onClick={downloadChart}
          className="mb-4 px-3 py-2 bg-teal-500 rounded-lg text-white"
        >
          Download
        </button>
      )}
      <ReactECharts ref={chartRef} option={option} opts={opts} style={{ height: "100%" }} />
    </div>
  );
};

export default GraphItem;
