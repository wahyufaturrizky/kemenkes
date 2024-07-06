"use client";

import React from "react";
import { Opts } from "echarts-for-react/lib/types";
import {
  Banner,
  BannerHighlightFooter,
  BannerText,
  // GraphEchartsAnc,
} from "@/components";
import { graphOptions1, graphOptions2, graphOptions3 } from "./graphOptions";
import GraphEchartsAnc from "@/components/graph-echarts-anc";
import {
  // dataYa,
  // dataTidak,
  ancGraphOptions1,
  ancGraphOptions2,
  ancGraphOptions3,
} from "@/utils/constants";

export default function Anc() {
  const totalData = ancGraphOptions1.map((option) => option.ya + option.tidak);
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center bg-image1 bg-support-b2 w-full">
        <div className="px-4 container">
          <Banner
            text={
              <BannerText
                highlight={`Dasbor Program Imunisasi Rutin`}
                highlightFooter={
                  <BannerHighlightFooter
                    look="567"
                    comment="145"
                    share="24"
                    classNameShare="text-support-b2"
                  />
                }
              />
            }
          />
        </div>
      </div>

      <div className="px-4 container">
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions1(
              [
                {
                  name: "Ya",
                  type: "bar",
                  stack: "total",
                  label: {
                    show: true,
                    formatter: (params: any) => {
                      const total = totalData[params.dataIndex];
                      const value = params.value;
                      const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage and format it to 2 decimal places
                      return `${percentage}%`;
                    },
                  },
                  emphasis: {
                    focus: "series",
                  },
                  itemStyle: {
                    color: "#00B3AC",
                  },
                  data: ancGraphOptions1?.map((r: any) => r?.ya || 0) || [],
                },
                {
                  name: "Tidak",
                  type: "bar",
                  stack: "total",
                  label: {
                    show: true,
                    formatter: (params: any) => {
                      const total = totalData[params.dataIndex];
                      const value = params.value;
                      const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage and format it to 2 decimal places
                      return `${percentage}%`;
                    },
                  },
                  emphasis: {
                    focus: "series",
                  },
                  itemStyle: {
                    color: "#BC2A3F",
                  },
                  data: ancGraphOptions1?.map((r: any) => r?.tidak || 0) || [],
                },
              ],
              ancGraphOptions1?.map((r: any) => r.label) || []
            )}
          />
        </div>
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions2(
              [
                {
                  name: "Anemia",
                  type: "bar",
                  color: "#00968E",
                  barGap: 0,
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data: ancGraphOptions2?.map((r: any) => r?.anemia || 0) || [],
                },
                {
                  name: "Mendapatkan TTD",
                  type: "bar",
                  color: "#04DACF",
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data:
                    ancGraphOptions2?.map((r: any) => r?.dapatTtd || 0) || [],
                },
                {
                  name: "Mengonsumsi TTD",
                  type: "bar",
                  color: "#737373",
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data:
                    ancGraphOptions2?.map((r: any) => r?.konsumsiTtd || 0) ||
                    [],
                },
              ],
              ancGraphOptions2?.map((r: any) => r.region)
            )}
          />
        </div>
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions2(
              [
                {
                  name: "Anemia",
                  type: "bar",
                  color: "#00968E",
                  barGap: 0,
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data: ancGraphOptions2?.map((r: any) => r?.anemia || 0) || [],
                },
                {
                  name: "Mendapatkan TTD",
                  type: "bar",
                  color: "#04DACF",
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data:
                    ancGraphOptions2?.map((r: any) => r?.dapatTtd || 0) || [],
                },
                {
                  name: "Mengonsumsi TTD",
                  type: "line",
                  color: "#BC2A3F",
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data:
                    ancGraphOptions2?.map((r: any) => r?.konsumsiTtd || 0) ||
                    [],
                },
              ],
              ancGraphOptions2?.map((r: any) => r.region)
            )}
          />
        </div>
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions3(
              [
                {
                  name: "Direct",
                  type: "bar",
                  barWidth: "50%",
                  data: ancGraphOptions3?.map((r: any) => r?.value || 0) || [],
                },
              ],
              ancGraphOptions3?.map((r: any) => r.label)
            )}
          />
        </div>
      </div>
    </div>
  );
}
